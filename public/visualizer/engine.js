// ---------- Config ----------
const TRACE_FILES = {
  trace32: "data/trace32.json",
  trace64: "data/trace64.json",
  trace256: "data/trace256.json",
};
const TYPE_ALLOC = 0, TYPE_FREE = 1, TYPE_RETRY = 2;
const N_STRIP_BUCKETS = 72;
const DECAY = 0.88; // per-frame decay for strip activity glow

// ---------- DOM ----------
const dieCanvas = document.getElementById("die-canvas");
const dieCtx = dieCanvas.getContext("2d");
const stripCanvas = document.getElementById("strip-canvas");
const stripCtx = stripCanvas.getContext("2d");
const scrub = document.getElementById("scrub");
const btnPlay = document.getElementById("btn-play");
const btnRestart = document.getElementById("btn-restart");
const readoutT = document.getElementById("readout-t");
const readoutTMax = document.getElementById("readout-tmax");
const readoutOcc = document.getElementById("readout-occ");
const readoutOccMax = document.getElementById("readout-occmax");
const readoutContention = document.getElementById("readout-contention");

// ---------- State ----------
let state = {
  traceName: null,
  data: null,
  playIndex: 0,
  playing: false,
  speed: 1,
  slabState: null,        // Uint8Array: 0 free, 1 alloc
  slabFlash: null,        // Float32Array: glow intensity, decays
  stripActivity: null,    // Float32Array per bucket
  stripRetry: null,       // Float32Array per bucket
  totalRetriesSoFar: 0,
  occSoFar: 0,
  rafId: null,
};

// ---------- Loading ----------
async function loadTrace(name) {
  cancelAnimationFrame(state.rafId);
  document.querySelectorAll(".trace-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.trace === name)
  );

  const res = await fetch(TRACE_FILES[name]);
  const data = await res.json();

  state.traceName = name;
  state.data = data;
  state.playIndex = 0;
  state.playing = false;
  state.slabState = new Uint8Array(data.maxSlab + 1);
  state.slabFlash = new Float32Array(data.maxSlab + 1);
  state.stripActivity = new Float32Array(N_STRIP_BUCKETS);
  state.stripRetry = new Float32Array(N_STRIP_BUCKETS);
  state.totalRetriesSoFar = 0;
  state.occSoFar = 0;

  btnPlay.textContent = "▶";
  scrub.max = data.playback.length - 1;
  scrub.value = 0;
  readoutTMax.textContent = "/ " + data.maxT.toLocaleString();
  readoutOccMax.textContent = "/ " + (data.maxSlab + 1).toLocaleString() + " slabs";

  resizeDie();
  resizeStrip();
  renderDie();
  renderStrip();
  updateReadouts();
  populateSummary();
}

// ---------- Die grid geometry ----------
let dieGrid = { cols: 1, rows: 1, cellW: 1, cellH: 1, count: 1 };

function computeDieGrid() {
  const count = state.data.maxSlab + 1;
  const rect = dieCanvas.getBoundingClientRect();
  const aspect = rect.width / Math.max(rect.height, 1);
  let cols = Math.max(1, Math.round(Math.sqrt(count * aspect)));
  let rows = Math.ceil(count / cols);
  dieGrid = {
    cols, rows, count,
    cellW: rect.width / cols,
    cellH: rect.height / rows,
  };
}

function resizeDie() {
  const rect = dieCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  dieCanvas.width = rect.width * dpr;
  dieCanvas.height = rect.height * dpr;
  dieCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  computeDieGrid();
}

function resizeStrip() {
  const rect = stripCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  stripCanvas.width = rect.width * dpr;
  stripCanvas.height = rect.height * dpr;
  stripCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}


// ---------- Rendering ----------
function renderDie() {
  const rect = dieCanvas.getBoundingClientRect();
  dieCtx.clearRect(0, 0, rect.width, rect.height);
  const pad = 1.5;

  for (let i = 0; i < dieGrid.count; i++) {
    const col = i % dieGrid.cols;
    const row = Math.floor(i / dieGrid.cols);
    const x = col * dieGrid.cellW;
    const y = row * dieGrid.cellH;
    const w = dieGrid.cellW - pad;
    const h = dieGrid.cellH - pad;

    const allocated = state.slabState[i] === 1;
    const flash = state.slabFlash[i];

    if (allocated) {
      dieCtx.fillStyle = "#E8A33D";
      if (flash > 0.05) {
        dieCtx.shadowColor = "rgba(232,163,61,0.85)";
        dieCtx.shadowBlur = 8 * flash;
      } else {
        dieCtx.shadowBlur = 0;
      }
      dieCtx.fillRect(x, y, w, h);
      dieCtx.shadowBlur = 0;
    } else {
      dieCtx.strokeStyle = flash > 0.05
        ? `rgba(232,163,61,${0.3 * flash})`
        : "#2B271F";
      dieCtx.lineWidth = 1;
      dieCtx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    }
  }
}

function renderStrip() {
  const rect = stripCanvas.getBoundingClientRect();
  stripCtx.clearRect(0, 0, rect.width, rect.height);
  const bw = rect.width / N_STRIP_BUCKETS;

  for (let i = 0; i < N_STRIP_BUCKETS; i++) {
    const a = state.stripActivity[i];
    const r = state.stripRetry[i];
    const h = Math.max(2, a * rect.height);
    const x = i * bw;

    if (r > 0.05) {
      stripCtx.fillStyle = `rgba(193,80,46,${0.35 + 0.65 * r})`;
      stripCtx.fillRect(x + 1, rect.height - Math.max(h, r * rect.height), bw - 2, Math.max(h, r * rect.height));
    } else if (a > 0.02) {
      stripCtx.fillStyle = `rgba(110,156,137,${0.3 + 0.7 * a})`;
      stripCtx.fillRect(x + 1, rect.height - h, bw - 2, h);
    }
  }
}

// ---------- Playback stepping ----------
function applyEvent(ev) {
  const [t, thread, type, slab] = ev;
  const bucket = Math.min(
    N_STRIP_BUCKETS - 1,
    Math.floor((thread / state.data.numThreads) * N_STRIP_BUCKETS)
  );

  if (type === TYPE_ALLOC) {
    state.slabState[slab] = 1;
    state.slabFlash[slab] = 1;
    state.occSoFar++;
    state.stripActivity[bucket] = 1;
  } else if (type === TYPE_FREE) {
    state.slabState[slab] = 0;
    state.slabFlash[slab] = 1;
    state.occSoFar = Math.max(0, state.occSoFar - 1);
    state.stripActivity[bucket] = 1;
  } else if (type === TYPE_RETRY) {
    state.totalRetriesSoFar++;
    state.stripRetry[bucket] = 1;
  }
}

function decayFrame() {
  for (let i = 0; i < state.slabFlash.length; i++) {
    if (state.slabFlash[i] > 0.01) state.slabFlash[i] *= 0.85;
  }
  for (let i = 0; i < N_STRIP_BUCKETS; i++) {
    state.stripActivity[i] *= DECAY;
    state.stripRetry[i] *= DECAY;
  }
}

function jumpTo(index) {
  state.slabState.fill(0);
  state.slabFlash.fill(0);
  state.stripActivity.fill(0);
  state.stripRetry.fill(0);
  state.totalRetriesSoFar = 0;
  state.occSoFar = 0;

  const pb = state.data.playback;
  for (let i = 0; i <= index; i++) applyEvent(pb[i]);
  state.playIndex = index;

  renderDie();
  renderStrip();
  updateReadouts();
}

function updateReadouts() {
  const pb = state.data.playback;
  const idx = Math.min(state.playIndex, pb.length - 1);
  const t = pb[idx] ? pb[idx][0] : 0;
  readoutT.textContent = t.toLocaleString();
  readoutOcc.textContent = state.occSoFar.toLocaleString();
  const rate = idx > 0 ? (state.totalRetriesSoFar / (idx + 1)) * 100 : 0;
  readoutContention.textContent = rate.toFixed(1) + "%";
  scrub.value = idx;
}

function step() {
  const pb = state.data.playback;
  const stepsPerFrame = Math.max(1, Math.round(state.speed * 3));
  for (let s = 0; s < stepsPerFrame; s++) {
    if (state.playIndex >= pb.length - 1) {
      state.playing = false;
      btnPlay.textContent = "▶";
      break;
    }
    state.playIndex++;
    applyEvent(pb[state.playIndex]);
  }
  decayFrame();
  renderDie();
  renderStrip();
  updateReadouts();

  if (state.playing) {
    state.rafId = requestAnimationFrame(step);
  }
}

// ---------- Summary / sparklines ----------
function populateSummary() {
  const d = state.data;
  document.getElementById("summary-total-events").textContent = d.totalEvents.toLocaleString();
  document.getElementById("stat-peak").textContent = d.peakOccupancy.toLocaleString();
  document.getElementById("stat-retries").textContent = d.totalRetries.toLocaleString();
  document.getElementById("stat-contention").textContent = (d.contentionRate * 100).toFixed(1) + "%";

  drawSparkline("spark-occupancy", d.stats.occupancy, "#E8A33D");
  drawSparkline("spark-retries", d.stats.retries, "#C1502E");
}

function drawSparkline(canvasId, values, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const max = Math.max(...values, 1);
  const n = values.length;
  const stepX = rect.width / (n - 1);
  const pad = 6;

  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = i * stepX;
    const y = rect.height - pad - (values[i] / max) * (rect.height - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineTo(rect.width, rect.height);
  ctx.lineTo(0, rect.height);
  ctx.closePath();
  ctx.fillStyle = color + "33";
  ctx.fill();

  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = i * stepX;
    const y = rect.height - pad - (values[i] / max) * (rect.height - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// ---------- Controls ----------
document.querySelectorAll(".trace-btn").forEach(btn => {
  btn.addEventListener("click", () => loadTrace(btn.dataset.trace));
});

btnPlay.addEventListener("click", () => {
  state.playing = !state.playing;
  btnPlay.textContent = state.playing ? "❚❚" : "▶";
  if (state.playing) {
    if (state.playIndex >= state.data.playback.length - 1) jumpTo(0);
    state.rafId = requestAnimationFrame(step);
  } else {
    cancelAnimationFrame(state.rafId);
  }
});

btnRestart.addEventListener("click", () => {
  state.playing = false;
  btnPlay.textContent = "▶";
  cancelAnimationFrame(state.rafId);
  jumpTo(0);
});

scrub.addEventListener("input", () => {
  state.playing = false;
  btnPlay.textContent = "▶";
  cancelAnimationFrame(state.rafId);
  jumpTo(parseInt(scrub.value, 10));
});

document.querySelectorAll(".speed-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.speed = parseFloat(btn.dataset.speed);
  });
});

window.addEventListener("resize", () => {
  if (!state.data) return;
  resizeDie();
  resizeStrip();
  renderDie();
  renderStrip();
});

// ---------- Init ----------
loadTrace("trace32");
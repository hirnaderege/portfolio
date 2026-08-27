import json, os

TYPE_CODE = { "alloc" : 0, "free" : 1, "retry" :  2}

def process(name, path, nBuckets=300, maxPlaybackEvents=25000):
    with open(path) as f:
        d = json.load(f)
    events = d["events"]
    nThreads = d["num_threads"]
    total = d["total_events"]
    maxT = events[-1]["t"]
    maxSlab = max((e["slab"] for e in events if e["type"] != "retry"), default=0)

    # full fidelity stats, computed from every real event
    bucketW = (maxT + 1 ) / nBuckets
    retries = [0] * nBuckets
    activeThreads = [set() for _ in range(nBuckets)]
    runningAlloc = set()
    occ = [0] * nBuckets

    for e in events:
        b = min(int(e["t"] / bucketW), nBuckets - 1)
        if e["type"] == "alloc":
            runningAlloc.add(e["slab"])
        elif e["type"] == "free":
            runningAlloc.discard(e["slab"])
        elif e["type"] == "retry":
            retries[b] += 1
        activeThreads[b].add(e["thread"])
        occ[b] = len(runningAlloc)

    peakOcc = max(occ)
    totalRetries = sum(1 for e in events if e["type"] == "retry")

    # downsampled event stream for smooth playback
    stride = max(1, total // maxPlaybackEvents)
    sampled = events[::stride]
    playback = [[e["t"], e["thread"], TYPE_CODE[e["type"]],
                 e["slab"] if e["type"] != "retry" else -1] for e in sampled]

    out = {
        "name": name, 
        "numThreads": nThreads,
        "totalEvents": total,
        "maxSlab": maxSlab,
        "maxT": maxT,
        "peakOccupancy": peakOcc,
        "totalRetries": totalRetries,
        "contentionRate": totalRetries / total,
        "stats": { "bucketWidth": bucketW, "occupancy": occ, "retries": retries,
                  "activeThreads": [len(s) for s in activeThreads]},
        "playback": playback,
    }

    os.makedirs("data", exist_ok=True)
    with open(f"data/{name}.json", "w") as f:
        json.dump(out, f)
    print(f"{name}: {total} events -> {len(playback)} sampled, "
          f"{os.path.getsize(f'data/{name}.json')/1024:.1f} KB")

process("trace32", "raw/trace32.json")
process("trace64", "raw/trace64.json")
process("trace256", "raw/trace256.json")
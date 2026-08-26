export default function VisualizerPage() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <iframe
        src="visualizer/main.html"
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          display: 'block',
        }}
        title="GPU Allocator Visualizer"
      />
    </div>
  );
}
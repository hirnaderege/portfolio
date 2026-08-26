export default function VisualizerPage() {
  return (
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
  );
}
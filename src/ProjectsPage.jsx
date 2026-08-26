import FlipCard from './FlipCard.jsx';

export default function ProjectsPage() {
  return (
    <>
      <header>my PROJECTS</header>
      <p>my digital net worth ( °ㅁ°) !!</p>

      <div className="flip-container">
        <div className="flipper">
          <FlipCard
            image="images/subset/_ (1).jpeg"
            alt="lock-free GPU memory allocator!"
            text="Slab-based GPU Memory Allocation!"
            href="https://github.com/hirnaderege/research"
          />
          <FlipCard
            image="images/subset/036fb4a6-660a-46ea-be7e-e0b9f9b8fc79.jpeg"
            alt="safeChart!"
            text="GPS app that takes elevation into account — anthill ✨"
            href="https://github.com/hirnaderege/anthill"
          />
          <FlipCard
            image="images/subset/54e20151-db2d-43b1-b7b0-7a167ea548e9.jpeg"
            alt="smiski"
            text="LeetCode Stats!!! ✨"
            href="https://github.com/hirnaderege/myLeetcode"
          />
          <FlipCard
            image="images/subset/823122da-287c-4ed8-b6db-07a7bda064c3.jpeg"
            alt="GPU allocator visualizer"
            text="GPU Allocator Visualizer ✨"
            href="/visualizer/main.html"
          />
        </div>
      </div>
    </>
  );
}
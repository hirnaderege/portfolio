import FlipCard from './FlipCard.jsx';

export default function ProjectsPage() {
  return (
    <>
      <header>my PROJECTS</header>
      <p>my digital net worth ( °ㅁ°) !!</p>

      <div className="flip-container">
          <FlipCard
            image="images/subset/green.jpeg"
            alt="lock-free GPU memory allocator"
            text="slab-based GPU memory allocator + visualizer! ⊹ ࣪ ˖"
            href="/portfolio/#/visualizer"
            newTab={false}
            repoHref="https://github.com/hirnaderege/research"
          />
          <FlipCard
            image="images/subset/036fb4a6-660a-46ea-be7e-e0b9f9b8fc79.jpeg"
            alt="anthill GPS app"
            text="GPS app that takes elevation into account  ⭑.ᐟ anthill .ᐟ⭑"
            href="https://hirnaderege.github.io/anthill/"
            repoHref="https://github.com/hirnaderege/anthill"
          />
          <FlipCard
            image="images/subset/54e20151-db2d-43b1-b7b0-7a167ea548e9.jpeg"
            alt="smiski"
            text=" 𑣲⋆｡˚leetcode ˚｡⋆𑣲 "
            href="https://github.com/hirnaderege/myLeetcode"
          />
      </div>
    </>
  );
}
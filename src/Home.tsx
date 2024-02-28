import Piano from "./Piano";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-4xl mb-10">Piano Scales</h1>
        <p className="mb-10">
          Pick a scale type to practice and we will provide you direct feedback
          on the piano when you get a note right or wrong!
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn">Major</button>
          <button className="btn">Natural Minor</button>
          <button className="btn">Harmonic Minor</button>
          <button className="btn">Melodic Minor</button>
          <button className="btn">All Scales</button>
        </div>
      </div>
      <Piano />
    </div>
  );
}

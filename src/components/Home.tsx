import Quiz from "./Quiz";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-4xl mb-10">Piano Scales</h1>
        <p className="mb-10">
          Pick a scale type to practice and we will provide you direct feedback
          on the piano when you get a note right or wrong!
        </p>

        <div>
          <h2 className="text-xl mb-2">Scales</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-success">Major</button>
            <button className="btn btn-warning">Natural Minor</button>
          </div>
        </div>

        <div>
          <h2 className="text-xl mb-2 mt-10">Chords</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary">Major 7th</button>
            <button className="btn btn-secondary">Minor 7th</button>
            <button className="btn btn-accent">Dominant 7th</button>
          </div>
        </div>
      </div>
      <Quiz scaleType="major" />
    </div>
  );
}

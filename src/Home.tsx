import Piano from "./Piano";

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <h1 className="text-xl mb-10">Piano Scales</h1>
      <Piano />
    </div>
  );
}

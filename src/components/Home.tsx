import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex flex-col max-w-xl mx-auto">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Piano Theory</h1>
        <p className="text-gray-500">
        Dive into the world of music theory. Pick a topic, and see how quickly and accurately you can hit the right notes!
        </p>
      </div>
      <Outlet />
    </div>
  );
}

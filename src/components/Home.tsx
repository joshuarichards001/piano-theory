import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import InstallModal from "./InstallModal";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "fetchRecords" });
  });

  return (
    <div className="h-full flex flex-col max-w-xl mx-auto">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold">Piano Theory</h1>
        <InstallModal />
      </header>
      <Outlet />
    </div>
  );
}

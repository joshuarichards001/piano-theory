import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMute } from "../redux/slices/muteSlice";
import { VolumeHighIcon, VolumeMuteIcon } from "./Icons";
import InfoModal from "./InfoModal";
import InstallModal from "./InstallModal";
import QuestionModal from "./QuestionModal";

export default function Home() {
  const dispatch = useAppDispatch();
  const mute = useAppSelector((state) => state.mute);

  useEffect(() => {
    dispatch({ type: "fetchRecords" });
    dispatch({ type: "fetchMute" });
  }, [dispatch]);

  const handleMute = useCallback(() => {
    dispatch(setMute(!mute));
  }, [dispatch, mute]);

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto">
      <header className="navbar p-4 pt-header-safe-top fixed bg-base-100 max-w-2xl shadow-lg border-b border-b-base-300">
        <h1 className="navbar-start text-2xl font-bold">Piano Theory</h1>
        <div className="navbar-end flex gap-6">
          <button onClick={handleMute} aria-label="Toggle mute">
            {mute ? <VolumeMuteIcon /> : <VolumeHighIcon />}
          </button>
          <InfoModal />
          <InstallModal />
          <QuestionModal />
        </div>
      </header>
      <Outlet />
    </div>
  );
}

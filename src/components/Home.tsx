import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMute } from "../redux/slices/muteSlice";
import { VolumeHighIcon, VolumeMuteIcon } from "./Icons";
import InfoModal from "./InfoModal";
import InstallModal from "./InstallModal";

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
      <header className="sticky top-0 bg-base-100 shadow-xl flex justify-between p-4">
        <h1 className="text-2xl font-bold">Piano Theory</h1>
        <div className="flex gap-6">
          <button onClick={handleMute} aria-label="Toggle mute">
            {mute ? <VolumeMuteIcon /> : <VolumeHighIcon />}
          </button>
          <InfoModal />
          <InstallModal />
        </div>
      </header>
      <Outlet />
    </div>
  );
}

import { IonIcon } from "@ionic/react";
import { volumeHigh, volumeMute } from "ionicons/icons";
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMute } from "../redux/slices/muteSlice";
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
      <header className="flex justify-between items-baseline p-6">
        <h1 className="text-3xl font-bold">Piano Theory</h1>
        <div className="flex gap-4">
          <button onClick={handleMute} aria-label="Toggle mute">
            {mute ? (
              <IonIcon icon={volumeMute} className="h-7 w-7" />
            ) : (
              <IonIcon icon={volumeHigh} className="h-7 w-7" />
            )}
          </button>
          <InfoModal />
          <InstallModal />
        </div>
      </header>
      <Outlet />
    </div>
  );
}

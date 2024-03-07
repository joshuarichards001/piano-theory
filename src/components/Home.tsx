import { IonIcon } from "@ionic/react";
import { Outlet } from "react-router-dom";
import InstallModal from "./InstallModal";
import { logoAppleAppstore } from "ionicons/icons";

export default function Home() {
  return (
    <div className="h-full flex flex-col max-w-xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Piano Theory</h1>
          <button
            onClick={() => {
              (
                document.getElementById("install-modal") as HTMLFormElement
              ).showModal();
            }}
          >
            <IonIcon icon={logoAppleAppstore} className="h-8 w-8" color="white" />
          </button>
        </div>
        <p className="text-gray-500">
          Dive into the world of music theory. Pick a topic, and see how quickly
          and accurately you can hit the right notes!
        </p>
      </div>
      <InstallModal />
      <Outlet />
    </div>
  );
}

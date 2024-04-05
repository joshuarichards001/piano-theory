import { IonIcon } from "@ionic/react";
import {
  addCircle,
  close,
  ellipsisVertical,
  logoAppleAppstore,
  phonePortraitOutline,
  shareOutline,
} from "ionicons/icons";

const getOS = () => {
  if (/android/i.test(navigator.userAgent)) {
    return "Android";
  } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    return "iOS";
  } else {
    return "Desktop";
  }
};

const Instructions = ({ os }: { os: "Android" | "iOS" | "Desktop" }) => {
  if (os === "iOS") {
    return (
      <>
        <div className="flex items-center justify-start mb-6">
          <IonIcon icon={shareOutline} className="h-8 w-8" color="white" />
          <p className="ml-3">
            1) Press the 'Share' button below on your browser
          </p>
        </div>
        <div className="flex items-center justify-start">
          <IonIcon icon={addCircle} className="h-8 w-8" color="white" />
          <p className="ml-3">2) Press 'Add to Home Screen'</p>
        </div>
      </>
    );
  } else if (os === "Android") {
    return (
      <>
        <div className="flex items-center justify-start mb-6">
          <IonIcon icon={ellipsisVertical} className="h-8 w-8" color="white" />
          <p className="ml-3">
            1) Press the 'Options' button at the top on your browser
          </p>
        </div>
        <div className="flex items-center justify-start">
          <IonIcon icon={addCircle} className="h-8 w-8" color="white" />
          <p className="ml-3">2) Press 'Add to Home Screen'</p>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-start mb-6">
        <IonIcon
          icon={phonePortraitOutline}
          className="h-10 w-10"
          color="white"
        />
        <p className="ml-3">
          This is a mobile only feature, check out Piano Theory on your phones
          browser!
        </p>
      </div>
    );
  }
};

export default function Modal() {
  const os = getOS();

  return (
    <>
      <button
        aria-label="Open install modal"
        onClick={() => {
          (
            document.getElementById("install-modal") as HTMLFormElement
          ).showModal();
        }}
      >
        <IonIcon icon={logoAppleAppstore} className="h-7 w-7" />
      </button>
      <dialog id="install-modal" className="modal">
        <div className="modal-box relative flex flex-col">
          <form method="dialog">
            <button
              aria-label="Close install modal"
              className="absolute right-6 top-6"
            >
              <IonIcon icon={close} className="h-5 w-5" />
            </button>
          </form>
          <h2 className="text-2xl font-bold mb-2">Add to Home Screen</h2>
          <p className="text-base-content/70 mb-10">
            This website has app functionality. Add it to your home screen to
            use it in fullscreen.
            {os === "iOS"
              ? "(make sure you're using Safari)"
              : os === "Android" && "(make sure you're using Chrome)"}
          </p>

          <Instructions os={os} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

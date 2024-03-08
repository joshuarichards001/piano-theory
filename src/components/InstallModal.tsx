import { IonIcon } from "@ionic/react";
import {
  addCircle,
  close,
  ellipsisVertical,
  phonePortraitOutline,
  shareOutline,
} from "ionicons/icons";

export default function Modal() {
  const getOS = () => {
    if (/android/i.test(navigator.userAgent)) {
      return "Android";
    } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return "iOS";
    } else {
      return "Desktop";
    }
  };

  return (
    <dialog id="install-modal" className="modal">
      <div className="modal-box relative flex flex-col bg-background-highlight h-80">
        <form method="dialog">
          <button className="absolute right-6 top-6">
            <IonIcon icon={close} className="h-5 w-5" color="white" />
          </button>
        </form>
        <h2 className="text-2xl font-bold mb-2">Add to Home Screen</h2>
        <p className="text-gray-500 mb-10">
          This website has app functionality. Add it to your home screen to use
          it in fullscreen.
          {getOS() === "iOS"
            ? "(make sure you're using Safari)"
            : getOS() === "Android" && "(make sure you're using Chrome)"}
        </p>

        {getOS() !== "Desktop" ? (
          <>
            <div className="flex items-center justify-start mb-6">
              {getOS() === "iOS" ? (
                <>
                  <IonIcon
                    icon={shareOutline}
                    className="h-8 w-8"
                    color="white"
                  />
                  <p className="ml-3">
                    1) Press the 'Share' button below on your browser
                  </p>
                </>
              ) : getOS() === "Android" ? (
                <>
                  <IonIcon
                    icon={ellipsisVertical}
                    className="h-8 w-8"
                    color="white"
                  />
                  <p className="ml-3">
                    1) Press the 'Options' button at the top on your browser
                  </p>
                </>
              ) : null}
            </div>

            <div className="flex items-center justify-start">
              <IonIcon icon={addCircle} className="h-8 w-8" color="white" />
              <p className="ml-3">2) Press 'Add to Home Screen'</p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-start mb-6">
            <div className="flex items-center justify-start">
              <IonIcon
                icon={phonePortraitOutline}
                className="h-10 w-10"
                color="white"
              />
              <p className="ml-3">
                This is a mobile only feature, check out Piano Theory on your
                phones browser!
              </p>
            </div>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

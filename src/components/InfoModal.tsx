import { IonIcon } from "@ionic/react";
import { close, helpCircle } from "ionicons/icons";

export default function InfoModal() {
  return (
    <>
      <button
        aria-label="Open info modal"
        onClick={() => {
          (
            document.getElementById("info-modal") as HTMLFormElement
          ).showModal();
        }}
      >
        <IonIcon icon={helpCircle} className="h-8 w-8" />
      </button>
      <dialog id="info-modal" className="modal">
        <div className="modal-box relative flex flex-col h-80">
          <form method="dialog">
            <button
              aria-label="Close info modal"
              className="absolute right-6 top-6"
            >
              <IonIcon icon={close} className="h-5 w-5" />
            </button>
          </form>
          <h2 className="text-2xl font-bold mb-4">
            Thanks for checking out Piano Theory!
          </h2>
          <p className="mb-10 text-base-content/60">
            After doing some searching I found there wasn't many good piano
            theory apps that use a virtual keyboard to input your answers. To
            address this I built Piano Theory!
          </p>
          <div>
            <p>
              Built by{" "}
              <a
                className="link link-primary"
                href="https://josh.work"
                target="_blank"
                rel="noreferrer"
              >
                Josh Richards
              </a>
            </p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

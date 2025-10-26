import { CloseIcon, InfoIcon } from "./Icons";

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
        <InfoIcon />
      </button>
      <dialog id="info-modal" className="modal">
        <div className="modal-box relative flex flex-col">
          <form method="dialog">
            <button
              aria-label="Close info modal"
              className="absolute right-6 top-6"
            >
              <CloseIcon />
            </button>
          </form>
          <h2 className="text-2xl font-bold mb-4">
            Thanks for checking out Piano Theory!
          </h2>
          <p className="mb-10 tracking-wide text-base-content/70">
            After doing some searching I found there wasn't many good music
            theory quiz apps that use a virtual keyboard to input your answers.
            To address this I built Piano Theory!
          </p>
          <p className="mb-4">
            Built by{" "}
            <a
              className="link link-secondary"
              href="https://josh.work"
              target="_blank"
              rel="noreferrer"
            >
              Josh Richards
            </a>
          </p>
          <p className="mb-4">
            Love Piano Theory?{" "}
            <a
              className="link link-secondary"
              href="https://www.buymeacoffee.com/joshuarichards"
              target="_blank"
              rel="noreferrer"
            >
              Support the Project
            </a>
          </p>
          <p>
            Keep posted about{" "}
            <a
              className="link link-secondary"
              href="https://new.pianotheory.app"
              target="_blank"
              rel="noreferrer"
            >
              New Piano App
            </a>
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

import {
  AddIcon,
  CloseIcon,
  EllipsisIcon,
  InstallIcon,
  PhoneIcon,
  ShareIcon,
} from "./Icons";

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
          <ShareIcon />
          <p className="ml-3">
            1) Press the 'Share' button below on your browser
          </p>
        </div>
        <div className="flex items-center justify-start">
          <AddIcon />
          <p className="ml-3">2) Press 'Add to Home Screen'</p>
        </div>
      </>
    );
  } else if (os === "Android") {
    return (
      <>
        <div className="flex items-center justify-start mb-6">
          <EllipsisIcon />
          <p className="ml-3">
            1) Press the 'Options' button at the top on your browser
          </p>
        </div>
        <div className="flex items-center justify-start">
          <AddIcon />
          <p className="ml-3">2) Press 'Add to Home Screen'</p>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-start mb-6">
        <PhoneIcon />
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
        <InstallIcon />
      </button>
      <dialog id="install-modal" className="modal">
        <div className="modal-box relative flex flex-col">
          <form method="dialog">
            <button
              aria-label="Close install modal"
              className="absolute right-6 top-6"
            >
              <CloseIcon />
            </button>
          </form>
          <h2 className="text-2xl font-bold mb-2">Add to Home Screen</h2>
          <p className="text-base-content/70 mb-10">
            This website has app functionality. Add it to your home screen to
            use it in fullscreen
            {os === "iOS"
              ? " (and make sure you're on the home page and using Safari)."
              : os === "Android" &&
                " (and make sure you're on the home page and using Chrome)."}
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

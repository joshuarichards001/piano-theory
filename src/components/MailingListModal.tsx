import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";
import EmailSignupForm from "./EmailSignupForm";

export default function MailingListModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenMailingListModal");
    if (!hasSeen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  const handleSuccess = () => {
    localStorage.setItem("hasSeenMailingListModal", "true");
    setTimeout(() => dialogRef.current?.close(), 1000);
  };

  const handleClose = () => {
    localStorage.setItem("hasSeenMailingListModal", "true");
  };

  return (
    <dialog
      id="mailing-list-modal"
      className="modal"
      ref={dialogRef}
      onClose={handleClose}
    >
      <div className="modal-box relative flex flex-col">
        <form method="dialog">
          <button
            aria-label="Close mailing list modal"
            className="absolute right-6 top-6"
          >
            <CloseIcon />
          </button>
        </form>
        <h2 className="text-2xl font-bold mb-4">
          Join the Piano Theory Native App Waitlist
        </h2>
        <p className="mb-4 text-base-content/70">
          Sign up to get notified about the new app!
        </p>
        <EmailSignupForm onSuccess={handleSuccess} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

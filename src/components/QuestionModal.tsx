import { useEffect, useRef, useState } from "react";
import { supabase } from "../main";
import { CloseIcon } from "./Icons";

export default function QuestionModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [preference, setPreference] = useState("");

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenDevelopmentQuestion");
    if (!hasSeen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  const handlePreference = async (preference: string) => {
    setPreference(preference);
    setLoading(true);
    await supabase.from("preference_response").insert({ preference });
    setLoading(false);

    localStorage.setItem("hasSeenDevelopmentQuestion", "true");
    dialogRef.current?.close();
  };

  const handleClose = () => {
    localStorage.setItem("hasSeenDevelopmentQuestion", "true");
  };

  return (
    <dialog
      id="question-modal"
      className="modal"
      ref={dialogRef}
      onClose={handleClose}
    >
      <div className="modal-box relative flex flex-col">
        <form method="dialog">
          <button
            aria-label="Close question modal"
            className="absolute right-6 top-6"
          >
            <CloseIcon />
          </button>
        </form>
        <h2 className="text-2xl font-bold mb-4">
          How would you like me to further develop Piano Theory?
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          <button
            className="btn btn-neutral"
            onClick={() => handlePreference("native")}
          >
            {loading && preference === "native" ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <p>Build a native mobile app on the App Store</p>
            )}
          </button>
          <button
            className="btn btn-neutral"
            onClick={() => handlePreference("web")}
          >
            {loading && preference === "web" ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <p>Continue developing this web version</p>
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

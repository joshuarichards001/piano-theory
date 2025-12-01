import { FormEvent, useState } from "react";

interface EmailSignupFormProps {
  onSuccess?: () => void;
}

export default function EmailSignupForm({ onSuccess }: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting...");
    setMessageColor("black");

    try {
      const response = await fetch(
        "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-7ee6ce09-7bf7-4175-aa5f-d29474ad4e7f/default/add-user-to-mailing-list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessageColor("green");
        setMessage("Successfully joined the waitlist!");
        setEmail("");
        onSuccess?.();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setMessageColor("red");
      setMessage("Problem joining the waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email..."
          className="input input-bordered h-22"
          required
        />
        <button
          type="submit"
          className="btn btn-primary font-bold shadow-md"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
      {message && (
        <p className="text-xs ml-2" style={{ color: messageColor }}>
          {message}
        </p>
      )}
    </form>
  );
}

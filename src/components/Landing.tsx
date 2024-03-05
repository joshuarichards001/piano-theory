import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div>
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("major-scale")}
            className="btn btn-success"
          >
            Major
          </button>
          <button
            onClick={() => navigate("natural-minor-scale")}
            className="btn btn-warning"
          >
            Natural Minor
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl mb-2 mt-10 font-bold">Chords</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("major-7th-chord")}
            className="btn btn-primary"
          >
            Major 7th
          </button>
          <button
            onClick={() => navigate("minor-7th-chord")}
            className="btn btn-secondary"
          >
            Minor 7th
          </button>
          <button
            onClick={() => navigate("dominant-7th-chord")}
            className="btn btn-accent"
          >
            Dominant 7th
          </button>
        </div>
      </div>
    </div>
  );
}

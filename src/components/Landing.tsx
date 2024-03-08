import { useNavigate } from "react-router-dom";
import { getQuizColour } from "../functions";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div>
        <h2 className="text-2xl mb-2 font-bold">Scales</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("major-scale")}
            className={`btn ${getQuizColour("major-scale")}`}
          >
            Major
          </button>
          <button
            onClick={() => navigate("natural-minor-scale")}
            className={`btn ${getQuizColour("natural-minor-scale")}`}
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
            className={`btn ${getQuizColour("major-7th-chord")}`}
          >
            Major 7th
          </button>
          <button
            onClick={() => navigate("minor-7th-chord")}
            className={`btn ${getQuizColour("minor-7th-chord")}`}
          >
            Minor 7th
          </button>
          <button
            onClick={() => navigate("dominant-7th-chord")}
            className={`btn ${getQuizColour("dominant-7th-chord")}`}
          >
            Dominant 7th
          </button>
          <button
            onClick={() => navigate("half-diminished-7th-chord")}
            className={`btn ${getQuizColour("half-diminished-7th-chord")}`}
          >
            Half Diminished 7th
          </button>
          <button
            onClick={() => navigate("diminished-7th-chord")}
            className={`btn ${getQuizColour("diminished-7th-chord")}`}
          >
            Diminished 7th
          </button>
        </div>
      </div>
    </div>
  );
}

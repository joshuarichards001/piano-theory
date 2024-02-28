import Key from "./Key";
import { NOTES } from "./constants";

// type Props = {
//   scaleKey: string;
//   scaleType: ScaleType;
// };

export default function Piano() {
  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note) => {
        return <Key fileName={`${note}.mp3`} />;
      })}
    </div>
  );
}

import { NOTES } from "../constants";
import Key from "./Key";

type Props = {
  scale: string[];
};

export default function Piano({ scale }: Props) {
  return (
    <div className="flex w-full max-w-xl">
      {NOTES.map((note) => (
        <Key
          key={note}
          correct={scale.includes(note)}
          fileName={`${note}.mp3`}
        />
      ))}
    </div>
  );
}

import Key from "./Key";
import { NOTES } from "./constants";

// type Props = {
//   scaleKey: string;
//   scaleType: ScaleType;
// };

export default function Piano() {
  const getKeys = () => {
    const keys = [];

    for (let i = 3; i <= 4; i++) {
      for (const note of NOTES) {
        keys.push(<Key fileName={`${note}${i}.mp3`} />);
      }
    }

    return keys;
  };

  return <div className="flex w-full max-w-xl">{getKeys()}</div>;
}

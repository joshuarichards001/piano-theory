import { blackColor, whiteBorder, whiteColor } from "../functions";

type Props = {
  keyIndex: number;
  note: string;
  correct: boolean | null;
  setPressedKeys: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function Key({
  keyIndex,
  note,
  correct,
  setPressedKeys,
}: Props) {
  const keyStyles = () => {
    if (!note.includes("b")) {
      return `grow-[3] h-24 active:bg-neutral-300 ${whiteColor(
        correct,
      )} ${whiteBorder(note)}`;
    } else {
      return `grow-[2] h-14 active:bg-neutral-700 ${blackColor(
        correct,
      )} z-10 -mx-[3%]`;
    }
  };

  return (
    <button
      onClick={() => setPressedKeys((prev) => [...prev, keyIndex])}
      className={keyStyles()}
    />
  );
}

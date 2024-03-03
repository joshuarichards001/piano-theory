import { blackColor, whiteBorder, whiteColor } from "../functions";

type Props = {
  keyIndex: number;
  note: string;
  keyState: KeyState;
  setPressedKeys: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function Key({
  keyIndex,
  note,
  keyState,
  setPressedKeys,
}: Props) {
  const keyStyles = () => {
    if (!note.includes("b")) {
      return `grow-[3] h-24 active:bg-neutral-300 ${whiteColor(
        keyState,
      )} ${whiteBorder(note)}`;
    } else {
      return `grow-[2] h-14 active:bg-neutral-700 ${blackColor(
        keyState,
      )} z-10 -mx-[3%]`;
    }
  };

  return (
    <button
      onClick={() => {
        if (keyState !== "failed") {
          setPressedKeys((prev) => [...prev, keyIndex]);
        }
      }}
      className={keyStyles()}
    />
  );
}

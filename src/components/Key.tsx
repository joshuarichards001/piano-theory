import { blackColor, whiteBorder, whiteColor } from "../functions";
import { useAppDispatch } from "../redux/hooks";
import { addKey } from "../redux/pressedKeysSlice";

type Props = {
  keyIndex: number;
  note: string;
  keyState: KeyState;
};

export default function Key({
  keyIndex,
  note,
  keyState,
}: Props) {
  const dispatch = useAppDispatch();

  const keyStyles = () => {
    if (!note.includes("b")) {
      return `grow-[3] h-24 active:bg-neutral-300 ${whiteColor(
        keyState,
      )} ${whiteBorder(note)}`;
    } else {
      return `grow-[2] h-14 active:bg-neutral-700 border-2 border-black ${blackColor(
        keyState,
      )} z-10 -mx-[3%]`;
    }
  };

  return (
    <button
      onClick={() => {
        dispatch(addKey(keyIndex));
      }}
      className={keyStyles()}
    />
  );
}

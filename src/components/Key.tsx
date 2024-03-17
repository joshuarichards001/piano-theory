import { getKeyStyles } from "../functions";
import { useAppDispatch } from "../redux/hooks";
import { addKey } from "../redux/slices/pressedKeysSlice";

type Props = {
  keyIndex: number;
  note: string;
  keyState: KeyState;
};

export default function Key({ keyIndex, note, keyState }: Props) {
  const dispatch = useAppDispatch();

  const handleInteraction = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      event.type === "keydown" &&
      (event as React.KeyboardEvent).key !== "Enter"
    ) {
      return;
    }

    dispatch(addKey(keyIndex));
  };

  return (
    <button
      aria-label={`Piano key ${note}`}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      className={getKeyStyles(note, keyState)}
    />
  );
}

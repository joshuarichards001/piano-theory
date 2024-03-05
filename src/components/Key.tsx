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

  const handleInteraction = () => {
    dispatch(addKey(keyIndex));
  };

  return (
    <button
      onTouchStart={handleInteraction}
      onMouseDown={handleInteraction}
      className={getKeyStyles(note, keyState)}
    />
  );
}

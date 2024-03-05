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

  return (
    <button
      onTouchStart={() => {
        dispatch(addKey(keyIndex));
      }}
      className={getKeyStyles(note, keyState)}
    />
  );
}

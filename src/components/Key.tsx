import { useParams } from "react-router-dom";
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
  const quizType =
    useParams<{ quizType: QuizType }>().quizType || "major-scale";

  const handleInteraction = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    const isMouseDevice = window.matchMedia("(hover: hover)").matches;

    if (event.type === "touchstart" && !isMouseDevice) {
      dispatch(addKey(keyIndex));
    } else if (event.type === "mousedown" && isMouseDevice) {
      dispatch(addKey(keyIndex));
    }
  };

  return (
    <button
      onTouchStart={handleInteraction}
      onMouseDown={handleInteraction}
      className={getKeyStyles(note, keyState, quizType)}
    />
  );
}

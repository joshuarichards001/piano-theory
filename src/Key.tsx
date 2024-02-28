type Props = {
  type: "white" | "black";
  note: string;
  fileName: string;
};

export default function Key({ type, note, fileName }: Props) {
  const onClick = () => {
    const audio = new Audio(`/notes/${fileName}`);
    audio.play();
  };

  if (type === "white") {
    return (
      <div
        onClick={onClick}
        className={`grow-[3] h-24 bg-white active:bg-neutral-400 border-2 border-black ${
          (note === "E" || note === "B") && "border-r-0"
        } last:border-r-2`}
      />
    );
  } else {
    return (
      <div
        onClick={onClick}
        className="grow-[2] h-14 bg-black active:bg-neutral-600 z-10 -mx-[3%]"
      />
    );
  }
}

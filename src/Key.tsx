type Props = {
  type: "white" | "black";
  note: string;
  fileName: string;
};

export default function Key({ type, note }: Props) {
  if (type === "white") {
    return (
      <div
        className={`grow-[2] h-36 bg-white border-2 border-black ${
          (note === "f" || note === "c") && "border-l-0"
        }`}
      />
    );
  } else {
    return <div className="grow h-24 bg-black z-10 -mx-[2%]" />;
  }
}

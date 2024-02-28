type Props = {
  type: "white" | "black";
  note: string;
  fileName: string;
};

export default function Key({ type, note }: Props) {
  if (type === "white") {
    return (
      <div
        className={`grow-[3] h-24 bg-white active:bg-gray-300 border-2 border-black last:border-r-0 ${
          (note === "f" || note === "c") && "border-l-0"
        }`}
      />
    );
  } else {
    return <div className="grow-[2] h-14 bg-black active:bg-gray-700 z-10 -mx-[3%]" />;
  }
}

import Key from "./Key";

type Props = {
  scaleKey: string;
  scaleType: ScaleType;
};

export default function Piano({ scaleKey, scaleType }: Props) {
  return (
    <div className="flex w-full max-w-xl">
      <Key note="C" fileName="C3.mp3" />
      <Key note="Db" fileName="Db3.mp3" />
      <Key note="D" fileName="D3.mp3" />
      <Key note="Eb" fileName="Eb3.mp3" />
      <Key note="E" fileName="E3.mp3" />
      <Key note="F" fileName="F3.mp3" />
      <Key note="Gb" fileName="Gb3.mp3" />
      <Key note="G" fileName="G3.mp3" />
      <Key note="Ab" fileName="Ab3.mp3" />
      <Key note="A" fileName="A3.mp3" />
      <Key note="Bb" fileName="Bb3.mp3" />
      <Key note="B" fileName="B3.mp3" />
      <Key note="C" fileName="C4.mp3" />
      <Key note="Db" fileName="Db4.mp3" />
      <Key note="D" fileName="D4.mp3" />
      <Key note="Eb" fileName="Eb4.mp3" />
      <Key note="E" fileName="E4.mp3" />
      <Key note="F" fileName="F4.mp3" />
      <Key note="Gb" fileName="Gb4.mp3" />
      <Key note="G" fileName="G4.mp3" />
      <Key note="Ab" fileName="Ab4.mp3" />
      <Key note="A" fileName="A4.mp3" />
      <Key note="Bb" fileName="Bb4.mp3" />
      <Key note="B" fileName="B4.mp3" />
    </div>
  );
}

import Key from "./Key";

export default function Piano() {
  return (
    <div className="flex w-full max-w-xl">
      <Key type="white" note="C" fileName="C3.mp3" />
      <Key type="black" note="Db" fileName="Db3.mp3" />
      <Key type="white" note="D" fileName="D3.mp3" />
      <Key type="black" note="Eb" fileName="Eb3.mp3" />
      <Key type="white" note="E" fileName="E3.mp3" />
      <Key type="white" note="F" fileName="F3.mp3" />
      <Key type="black" note="Gb" fileName="Gb3.mp3" />
      <Key type="white" note="G" fileName="G3.mp3" />
      <Key type="black" note="Ab" fileName="Ab3.mp3" />
      <Key type="white" note="A" fileName="A3.mp3" />
      <Key type="black" note="Bb" fileName="Bb3.mp3" />
      <Key type="white" note="B" fileName="B3.mp3" />
      <Key type="white" note="C" fileName="C4.mp3" />
      <Key type="black" note="Db" fileName="Db4.mp3" />
      <Key type="white" note="D" fileName="D4.mp3" />
      <Key type="black" note="Eb" fileName="Eb4.mp3" />
      <Key type="white" note="E" fileName="E4.mp3" />
      <Key type="white" note="F" fileName="F4.mp3" />
      <Key type="black" note="Gb" fileName="Gb4.mp3" />
      <Key type="white" note="G" fileName="G4.mp3" />
      <Key type="black" note="Ab" fileName="Ab4.mp3" />
      <Key type="white" note="A" fileName="A4.mp3" />
      <Key type="black" note="Bb" fileName="Bb4.mp3" />
      <Key type="white" note="B" fileName="B4.mp3" />
    </div>
  )
}
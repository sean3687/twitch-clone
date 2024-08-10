import Image from "next/image";
import Stream from "./components/Stream";
import LiveChat from "./components/LiveChat";

export default function Home() {
  return (
    <main className="flex w-screen h-screen">
      <Stream/>
      <LiveChat/>
    </main>
  );
}

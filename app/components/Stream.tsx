export default function Broadcast() {
  return (
    <div className="w-full">
      <iframe
        className="flex justify-center items-center w-full h-screen"
        src={
          `https://player.twitch.tv/?video=2219331662&parent=${process.env.NEXT_PUBLIC_HOST}`
        }
      ></iframe>
    </div>
  );
}

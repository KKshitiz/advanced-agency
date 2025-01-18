import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import upArrow from "../../../public/images/arrow_up.svg";

const Showreel = () => {
  const [isCursorVisible, setCursorVisible] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    const video = videoRef.current;
    video?.addEventListener("mousemove", onMouseMove);

    return () => {
      video?.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="relative flex justify-center items-center">
      {/* <MarqueeText/> */}
      {/* <div className="showreel-text-wrapper text-8xl w-full bg-black overflow-hidden">
          <p className="showreel-text text-nowrap" ref={showreelTextRef}>
            Here is some text. Here is some text. Here is some text. Here is
            some text.
          </p>
        </div> */}
      <div className="relative flex justify-center">
        <div
          className={`fixed w-28 h-28 bg-red-500 rounded-full flex justify-center items-center transition-opacity duration-300 ${
            isCursorVisible ? `opacity-100` : `opacity-0`
          }`}
          style={{
            left: cursorPosition.x - 56,
            top: cursorPosition.y - 56,
          }}
        >
          <Image src={upArrow} alt="Up arrow" />
        </div>
        <video
          ref={videoRef}
          className="w-2/3"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
        >
          <source src="/videos/showreel_preview.mp4" />
        </video>
      </div>
    </section>
  );
};

export default Showreel;

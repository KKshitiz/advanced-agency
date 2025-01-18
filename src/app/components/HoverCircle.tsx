import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import upArrow from "../../../public/images/arrow_up.svg";
import readMore from "../../../public/images/read_more.svg";

type Tween = gsap.core.Tween;
const HoverCircle = () => {
  const readMoreRef = useRef<HTMLImageElement>(null);
  const internalFillRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<Tween>(null);

  useGSAP(() => {
    gsap.to(readMoreRef.current, {
      rotate: 360,
      repeat: -1,
      duration: 5,
      ease: "none",
    });
    const tween = gsap.to(internalFillRef.current, {
      width: "144px",
      height: "144px",
      duration: 0.7,
      ease: "power2.out",
      paused: true,
    });
    tweenRef.current = tween;
  });

  return (
    <div
      className="flex justify-center items-center w-36 h-36 rounded-full border-[0.5px] border-white relative p-4 cursor-pointer group"
      onMouseLeave={() => {
        tweenRef.current?.reverse();
      }}
      onMouseEnter={() => {
        tweenRef.current?.play();
      }}
    >
      <div
        className="absolute bg-white w-0 h-0 rounded-full"
        ref={internalFillRef}
      ></div>
      <Image
        ref={readMoreRef}
        src={readMore}
        alt="Read more"
        className="absolute hidden group-hover:flex group-hover:invert"
        width={120}
      />
      <Image
        src={upArrow}
        alt=""
        className="rotate-45 group-hover:invert bg-blend-color-dodge"
      />
    </div>
  );
};

export default HoverCircle;

import gsap from "gsap";
import { useEffect, useRef } from "react";

const MarqueeText = ({
  text = "This is a scrolling text marquee animation",
  speed = 40,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const textRef2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Get the width of the text element
    const textWidth = textRef.current!.offsetWidth;

    // Create timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Set initial positions
    gsap.set(textRef2.current, { left: textWidth });

    // Animate both text elements
    tl.to([textRef.current, textRef2.current], {
      duration: textWidth / speed,
      x: -textWidth,
      ease: "none",
      onComplete: () => {
        gsap.set([textRef.current, textRef2.current], { x: 0 });
      },
    });

    return () => {
      tl.kill();
    };
  }, [speed, text]);

  return (
    <div className="relative w-full overflow-hidden bg-black p-4 text-8xl">
      <div ref={containerRef} className="whitespace-nowrap flex">
        <span ref={textRef} className="inline-block text-xl">
          {text}
        </span>
        <span ref={textRef2} className="inline-block text-xl absolute">
          {text}
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;

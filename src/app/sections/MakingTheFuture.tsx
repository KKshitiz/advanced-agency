import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import HoverCircle from "../components/HoverCircle";

const MakingTheFuture = () => {
  const readMoreRef = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    gsap.to(readMoreRef.current, {
      rotate: 360,
      repeat: -1,
      duration: 5,
      ease: "none",
    });
  });

  return (
    <section className="flex flex-col justify-center items-center max-w-3xl m-auto h-screen">
      <h3 className="text-6xl mb-32">
        Every project made by advanced team is created at the intersection
        between design and technology, making the future — today
      </h3>
      <div className="flex items-start">
        <div className="flex flex-1 justify-center items-center">
          <HoverCircle />
        </div>
        <p className="flex-1 relative">
          With over 200 projects completed, our team has gained a comprehensive
          understanding of user behavior patterns. This knowledge allows us to
          provide our clients with efficient and effective solutions to their
          digital challenges. By leveraging our experience, we are able to
          achieve maximum efficiency in solving client problems and delivering
          successful outcomes.
          <span className="absolute w-full h-[0.1px] bg-white -bottom-12 left-0"></span>
        </p>
      </div>
    </section>
  );
};

export default MakingTheFuture;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import HoverCircle from "../components/HoverCircle";

const Belief = () => {
  const beliefRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: beliefRef.current,
          start: "top bottom",
          end: "bottom bottom",
          markers: true,
          scrub: true,
        },
        paused: false,
      })
      .to(beliefRef.current, {
        y: "-=80",
        opacity: 1,
        duration: 2,
      });
  });

  return (
    <section className="flex flex-col justify-center items-center max-w-3xl m-auto h-screen">
      <h3 className="text-5xl mb-32">
        We believe that the power of design, creativity, and emotion helps large
        and middle businesses to involve people in their products and services,
        multiplying their consumer characteristics
      </h3>
      <div className="flex items-start">
        <div className="flex flex-1 justify-center items-center">
          <HoverCircle />
        </div>
        <p className="flex-1 relative opacity-0" ref={beliefRef}>
          We keep looking towards the future, at the same time recognizing that
          behavior change takes place only with a clear awareness of the current
          state. Before we get down to the design, our team conducts a thorough
          audit of how your audience feels. Then we implement an emotional
          solution, attracting Customers to make a click. In this way, you stay
          unique today and will be of current interest no matter what awaits you
          in the future.
          <span className="absolute w-full h-[0.1px] bg-white -bottom-12 left-0"></span>
        </p>
      </div>
    </section>
  );
};

export default Belief;

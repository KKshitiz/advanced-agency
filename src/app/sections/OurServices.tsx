import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

const OurServices = () => {
  const divs = Array.from({ length: 9 }, (_, index) => index);

  useGSAP(() => {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.to(".cube", {
      duration: 2,
      repeatDelay: 3,
      repeat: -1,
      ease: "back.inOut",
      rotation: 180,
    });
    // Minor circular motion
    const r = 15;
    gsap.to(".cube-container", {
      motionPath: {
        path: `M ${-r}, 0
					 a ${r},${r} 0 1,0 ${r * 2},0
					 a ${r},${r} 0 1,0 -${r * 2},0z`,
      },
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  });

  return (
    <section className="h-screen flex justify-between max-w-4xl mx-auto">
      <div
        className="flex flex-col justify-center 
	  "
      >
        <h2 className="text-xs">Our services:</h2>
        <ul className="flex flex-col gap-y-2 text-7xl">
          <li>UX Strategy</li>
          <li>UI Design</li>
          <li>Development</li>
          <li>Communication</li>
        </ul>
      </div>
      <div className="cube-container relative flex justify-center items-center">
        <div className="absolute scale-125 grid gap-0 [grid-template-columns:repeat(3,100px)]">
          {divs.map((index) => (
            <div className="cube w-24 h-24 border-2 border-white" key={index} />
          ))}
        </div>
        <div className="absolute grid gap-0 [grid-template-columns:repeat(3,100px)]">
          {divs.map((index) => (
            <div className="cube w-24 h-24 border-2 border-white" key={index} />
          ))}
        </div>
        <div className="absolute scale-75 grid gap-0 [grid-template-columns:repeat(3,100px)]">
          {divs.map((index) => (
            <div className="cube w-24 h-24 border-2 border-white" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;

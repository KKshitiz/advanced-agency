"use client";
import Belief from "./sections/Belief";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import MakingTheFuture from "./sections/MakingTheFuture";
import OurServices from "./sections/OurServices";
import Projects from "./sections/Projects";
import Showreel from "./sections/Showreel";

export default function Home() {
  return (
    <main className="p-10">
      <Hero />
      <Showreel />
      <MakingTheFuture />
      <OurServices />
      <Belief />
      <Projects />
      <Footer />
    </main>
  );
}

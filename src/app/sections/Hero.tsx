import React from 'react'

const Hero = () => {
  return (
    <section className="h-screen relative">
      <div className="flex justify-between w-full">
        <header className="flex flex-col items-start text-6xl">
          <span>
            Advanced Agency <sup>®</sup>
          </span>
          <span>Digital Design</span>
          <span>Engineered</span>
          <span>into pixels</span>
        </header>
        <nav className="pointer-events-auto">
          <ul className="flex gap-12 text-gray-500">
            <li>Portfolio</li>
            <li>Agency</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <p className="absolute w-96 bottom-36 left-32">
        We pride ourselves on our ability to craft digital products that not
        only meet but exceed the expectations of our clients. With a wealth of
        experience and expertise in the field of digital product development, we
        understand how to design user-friendly interfaces that captivate and
        engage audiences.
      </p>
    </section>
  );
}

export default Hero
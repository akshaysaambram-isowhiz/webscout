import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

import soccer from "../assets/soccer.jpg";
import basketball from "../assets/basketball.jpg";
import baseball from "../assets/baseball.jpg";
import football from "../assets/football.jpg";
import hockey from "../assets/hockey.jpg";

export default function Hero() {
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    const cards = gsap.utils.toArray(".cards");
    cards.forEach((card) => {
      gsap.to(card as gsap.DOMTarget, {
        xPercent: -100,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    });

    tl.from("#hero h1", {
      y: 50,
      opacity: 0,
      duration: 1,
    })
      .from(
        "#hero p",
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        "#hero .cta",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      );
  }, []);

  return (
    <section
      id="hero"
      className="mx-auto max-w-2xl flex flex-col justify-center items-center gap-y-8 min-h-screen pt-12 md:pt-0"
    >
      <div className="text-center p-4">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Bid on your favorite trading cards.
        </h1>
        <p className="mt-8 text-pretty text-sm sm:text-base md:text-lg font-medium text-black">
          Our auction house is dedicated to providing a fun and safe environment
          to buy and sell trading cards. We offer a wide variety of trading
          cards from popular brands like Panini, Topps, and more.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 cta">
          <Link
            to="/dashboard"
            className="rounded-lg bg-yellow-500 px-4 py-2.5 text-sm md:text-base font-semibold text-white shadow-lg 
                hover:bg-yellow-600 hover:shadow-xl focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transform hover:-translate-y-0.5 
                active:translate-y-0 transition-all duration-200"
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="absolute -z-10 w-full flex gap-x-12 blur-sm overflow-hidden">
        <div className="flex items-center gap-x-12 cards">
          <div className="size-96 rounded-full overflow-hidden">
            <img
              src={soccer}
              alt="Soccer ball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-48 rounded-lg overflow-hidden">
            <img
              src={basketball}
              alt="Basketball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-60 rounded-3xl overflow-hidden">
            <img
              src={football}
              alt="Football"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-72 rounded-sm overflow-hidden">
            <img
              src={baseball}
              alt="Baseball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-52 rounded-xl overflow-hidden">
            <img
              src={hockey}
              alt="hockey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-12 cards">
          <div className="size-96 rounded-full overflow-hidden">
            <img
              src={soccer}
              alt="Soccer ball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-48 rounded-lg overflow-hidden">
            <img
              src={basketball}
              alt="Basketball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-60 rounded-3xl overflow-hidden">
            <img
              src={football}
              alt="Football"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-72 rounded-sm overflow-hidden">
            <img
              src={baseball}
              alt="Baseball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-52 rounded-xl overflow-hidden">
            <img
              src={hockey}
              alt="hockey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-12 cards">
          <div className="size-96 rounded-full overflow-hidden">
            <img
              src={soccer}
              alt="Soccer ball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-48 rounded-lg overflow-hidden">
            <img
              src={basketball}
              alt="Basketball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-60 rounded-3xl overflow-hidden">
            <img
              src={football}
              alt="Football"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-72 rounded-sm overflow-hidden">
            <img
              src={baseball}
              alt="Baseball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-52 rounded-xl overflow-hidden">
            <img
              src={hockey}
              alt="hockey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

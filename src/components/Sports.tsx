import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import f1 from "../assets/f1.svg";
import golf from "../assets/golf.svg";
import mlb from "../assets/mlb.svg";
import mls from "../assets/mls.svg";
import nba from "../assets/nba.svg";
import nfl from "../assets/nfl.svg";
import nhl from "../assets/nhl.svg";
import soccer from "../assets/soccer.svg";
import wnba from "../assets/wnba.svg";
import wwe from "../assets/wwe.svg";

const sports = [
  {
    id: 1,
    name: "NBA",
    image: nba,
  },
  {
    id: 2,
    name: "NHL",
    image: nhl,
  },
  {
    id: 3,
    name: "NFL",
    image: nfl,
  },
  {
    id: 4,
    name: "NCAAF",
    image: mlb,
  },
  {
    id: 5,
    name: "NCAAM",
    image: mls,
  },
  {
    id: 6,
    name: "WNBA",
    image: wnba,
  },
  {
    id: 7,
    name: "F1",
    image: f1,
  },
  {
    id: 8,
    name: "WWE",
    image: wwe,
  },
  {
    id: 9,
    name: "Soccer",
    image: soccer,
  },
  {
    id: 10,
    name: "Golf",
    image: golf,
  },
];

export default function Sports() {
  useGSAP(() => {
    gsap.from("#sports p", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from("#sports .sport", {
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      id="sports"
      className="pt-40 md:pt-24 pb-10 px-8 grid place-items-center gap-6"
    >
      <p className="text-2xl text-center">Shop Your Favorite League</p>
      <div className="flex flex-wrap justify-evenly gap-6">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="text-center space-y-2 hover:scale-125 transition-transform duration-300 ease-in-out group sport"
          >
            <div className="p-4 bg-gray-100 group-hover:bg-yellow-100 rounded-full cursor-pointer">
              <img
                src={sport.image}
                alt={sport.name}
                className="size-10"
                loading="lazy"
              />
            </div>
            <p className="text-sm group-hover:text-yellow-600">{sport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useRef, useEffect } from 'react';
import disney from '../assets/Images/disney.png';
import marvel from '../assets/Images/marvel.png';
import pixar from '../assets/Images/pixar.png';
import national from '../assets/Images/nationalG.png';

import disneyV from '../assets/Videos/disney.mp4';
import marvelV from '../assets/Videos/marvel.mp4';
import pixarV from '../assets/Videos/pixar.mp4';
import nationalV from '../assets/Videos/national-geographic.mp4';

function ProductionHouse() {
  const productionHouselist = [
    { id: 1, image: disney, video: disneyV },
    { id: 2, image: marvel, video: marvelV },
    { id: 3, image: pixar, video: pixarV },
    { id: 4, image: national, video: nationalV },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollLeft += 1;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 gap-10 sm:px-6 md:px-10 mt-6">
      <div
        ref={scrollRef}
        className="
          flex gap-6
          overflow-x-auto no-scrollbar      /* mobile scroll */

          md:flex-wrap                     /* tablet: wrap */
          md:justify-center                /* center items */
          md:gap-4                         /* reduce gap on tablets */
          py-3
          w-full max-w-full
        "
      >
        {productionHouselist.map((item) => (
          <div
            key={item.id}
            className="
              border border-gray-600 rounded-lg relative overflow-hidden
              cursor-pointer shadow-lg shadow-gray-800 group

              w-[200px] md:w-[100px] h-[130px] md:h-[80px]
              flex-shrink-0

              hover:scale-105 transition-all duration-300
            "
          >
            <video
              src={item.video}
              autoPlay loop muted playsInline
              className="
                absolute inset-0 w-full h-full object-cover
                opacity-0 group-hover:opacity-60
                transition-all duration-300
              "
            />

            <img
              src={item.image}
              className="
                w-full h-full object-cover relative z-10
                group-hover:opacity-40 transition-all duration-300
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductionHouse;

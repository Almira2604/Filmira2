import React from "react";
import ComingSoonSection from "../Constant/comingSoonSection";
import ComingSoonBox from "../Components/ComingSoonBox";

function GenreComingSoonList() {
  return (
    <div>
      {ComingSoonSection.map((item) => (
        <div
          key={item.id}
          className="py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-12"
        >
          <h2 className="text-[20px] font-bold text-white mb-4">
            {item.name}
          </h2>

          <ComingSoonBox
            genreId={item.id}
            type={item.type}
            endpoint={item.endpoint}
          />
        </div>
      ))}
    </div>
  );
}

export default GenreComingSoonList;



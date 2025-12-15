import React from "react";
import DiscoverySection from "../Constant/DiscoverySection";
import DiscoveryBox from "./DiscoveryBox";

function GenreDiscoveryList() {
  return (
    <div className="w-full overflow-x-hidden">
      {DiscoverySection.map((item) => (
        <div key={item.id} className="py-6">
          <h2 className="text-white text-xl font-bold px-6 mb-3">
            {item.name}
          </h2>

          <DiscoveryBox
            genreId={item.id}
            type={item.type}
          />
        </div>
      ))}
    </div>
  );
}

export default GenreDiscoveryList;




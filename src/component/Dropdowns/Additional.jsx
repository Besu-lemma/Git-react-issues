import React, { useState } from "react";

function Additional({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative md:pt-[6px]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span className="absolute z-10 w-20 bg-[#8b949e] text-white text-center py-1 rounded-lg text-xs bottom-[-5px] left-[60px] transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
          {text}
        </span>
      )}
    </div>
  );
}

export default Additional;

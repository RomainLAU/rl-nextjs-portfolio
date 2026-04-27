import React, { useRef, useState } from "react";

const ColoredText = ({ children }: { children: string }) => {
  const [coloredText, setColoredText] = useState<React.ReactNode[] | null>(
    null
  );
  const colorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getColoredText = (text: string) => {
    return text.split("").map((letter, index) => (
      <span
        key={index}
        style={{ color: `hsl(${Math.random() * 360}, 100%, 50%)` }}
      >
        {letter}
      </span>
    ));
  };

  const handleMouseEnter = () => {
    const update = () => setColoredText(getColoredText(children));
    update();
    colorIntervalRef.current = setInterval(update, 100);
  };

  const handleMouseLeave = () => {
    if (colorIntervalRef.current) clearInterval(colorIntervalRef.current);
    setColoredText(null);
  };

  return (
    <strong
      className="colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {coloredText || children}
    </strong>
  );
};

export default ColoredText;

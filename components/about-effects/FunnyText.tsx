import gsap from "gsap";
import React, { ReactNode, useRef } from "react";

const FunnyText = ({ children }: { children: ReactNode }) => {
  const targetRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHover = (isEntering: boolean) => {
    if (!targetRef.current) return;
    const target = targetRef.current;

    if (isEntering) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      gsap.to(target, {
        rotation: "random(-720, 720)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: "back.out(2)",
      });
    } else {
      timeoutRef.current = setTimeout(() => {
        gsap.to(target, {
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.1)",
          onComplete: () => {
            gsap.killTweensOf(target);
          },
        });
      }, 3000);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <strong ref={targetRef} className="funny inline-block cursor-default">
        {children}
      </strong>
    </div>
  );
};

export default FunnyText;

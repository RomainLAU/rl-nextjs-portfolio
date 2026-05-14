import { useGSAP } from "@gsap/react";
import { m } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { ReactNode, useRef } from "react";

import useIsMobile from "@/hooks/useIsMobile";

export default function PresentationText({
  text,
  image,
  index,
}: {
  text: string | ReactNode;
  image: { url: string; width: number; height: number; name: string };
  index: number;
}) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !textRef.current ||
        !imageRef.current ||
        isMobile !== false
      )
        return;

      gsap.set(textRef.current, { yPercent: index === 0 ? 500 : 300 });
      gsap.set(imageRef.current, { yPercent: 100 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      timeline
        .to(textRef.current, { yPercent: 0, duration: 3 }, 0)
        .to(imageRef.current, { yPercent: 0, duration: 3 }, 0);

      const exitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      exitTimeline
        .to(textRef.current, { yPercent: -300, duration: 3 }, 0)
        .to(imageRef.current, { yPercent: -100, duration: 3 }, 0);
    },
    { dependencies: [index, isMobile], scope: containerRef }
  );

  if (!!isMobile) {
    return (
      <div
        ref={containerRef}
        className={`relative mb-8 flex w-full flex-col items-center ${image ? "h-[80vh]" : "h-[50vh]"}`}
      >
        <m.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 w-3/4 text-center text-xl text-wrap"
        >
          {text}
        </m.div>
        {image && (
          <m.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-full w-3/4"
          >
            <Image
              priority={index === 0}
              quality={50}
              src={image.url}
              alt={image.name}
              width={image.width}
              height={image.height}
              className="h-full w-full object-contain"
            />
          </m.div>
        )}
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center"
      style={{ perspective: "500px", scrollSnapAlign: "center" }}
    >
      {image && (
        <div
          ref={imageRef}
          className="absolute h-auto max-h-[90vh] w-1/4"
          style={{ left: "25%" }}
        >
          <Image
            priority={index === 0}
            className="h-full w-full"
            src={image.url ?? ""}
            width={image.width ?? 100}
            height={image.height ?? 100}
            alt={image.name ?? ""}
            style={{ width: "100%", height: "100%" }}
            quality={80}
          />
        </div>
      )}
      <div
        ref={textRef}
        className="absolute flex flex-wrap items-center justify-center gap-x-10 text-9xl font-extrabold mix-blend-difference"
        style={{
          right: image ? "15%" : "",
          textAlign: image ? "left" : "center",
          maxWidth: image ? "30%" : "80%",
        }}
      >
        {text}
      </div>
    </section>
  );
}

import { m } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

import AnimatedTextOnScroll from "./animatedTextOnScroll";
import LinkButton from "./linkButton";
import Waves from "./react-bits/Waves";

gsap.registerPlugin(ScrollTrigger);

const MODAL_ANIMATION_DURATION = 400;

const modalAnimationProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: { duration: 0.4, ease: "easeIn" },
} as const;

interface MediaProps {
  media: {
    mime: string;
    url: string;
    alternativeText?: string;
  };
}

interface DescriptionModalProps {
  element: {
    id: string;
    company: string;
    title: string;
    feature_media?: MediaProps["media"];
    feature_description?: string;
    description?: string;
    project_url?: string;
  };
  setSelectedElement: React.Dispatch<React.SetStateAction<any>>;
}

const MediaContent = ({ media }: MediaProps) => {
  const isVideo = media.mime.includes("video");

  if (isVideo) {
    return (
      <video
        src={media.url}
        controls
        autoPlay
        className="h-[40vh] w-[40%] md:h-auto md:max-h-[50dvh] md:w-auto"
      />
    );
  }

  return (
    <m.div className="h-[40vh] w-[40%] md:h-auto md:max-h-[50dvh] md:min-h-[30vh] md:w-auto md:min-w-[35vw]">
      <Image
        src={media.url}
        alt={media.alternativeText || ""}
        width={400}
        height={200}
        className="aspect-video h-[40vh] w-[40%] object-contain md:h-[25vh] md:max-h-[50dvh] md:w-[40vw]"
        style={{ width: "auto", height: "auto" }}
      />
    </m.div>
  );
};

export default function DescriptionModal({
  element,
  setSelectedElement,
}: DescriptionModalProps) {
  const { locale } = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalMounted, setIsModalMounted] = useState(false);

  const handleClose = useCallback(
    () => setSelectedElement(null),
    [setSelectedElement]
  );

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    const modalTimeout = setTimeout(
      () => setIsModalMounted(true),
      MODAL_ANIMATION_DURATION
    );

    return () => {
      clearTimeout(modalTimeout);
      document.body.classList.remove("modal-open");
      setIsModalMounted(false);
    };
  }, []);

  if (!element) return null;

  return (
    <m.div
      key={`modal-${element.id}`}
      {...modalAnimationProps}
      className="sticky inset-0 z-1000 flex h-screen w-screen items-center justify-center bg-black"
      onClick={handleClose}
    >
      {isModalMounted && (
        <Waves
          lineColor="#fecaca"
          backgroundColor="rgb(0, 0, 0)"
          waveSpeedX={0.05}
          waveSpeedY={0.05}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.005}
          maxCursorMove={1000}
          xGap={12}
          yGap={36}
          className="h-[-webkit-fill-available]! w-full rounded-md border border-solid border-white"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="experience-modal absolute inset-[2.5%] flex h-[55%] w-[90%] flex-col gap-y-48 overflow-y-scroll bg-black p-12 pb-96"
          >
            <VscChromeClose
              onClick={handleClose}
              className="fixed top-20 right-20 z-100 cursor-pointer text-4xl mix-blend-difference transition-all duration-300 hover:rotate-90 hover:text-red-200"
            />

            <div className="relative flex w-full flex-col items-center justify-center gap-y-4">
              <m.h2 className="text-center text-6xl font-bold">
                {element.company}
              </m.h2>
              <m.h3 className="text-center text-xl font-extralight">
                {element.title}
              </m.h3>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              {element.feature_media && (
                <MediaContent media={element.feature_media} />
              )}
              {element.feature_description && (
                <m.div
                  className={`text-lg leading-10 tracking-widest ${element.feature_media ? "px-8" : ""}`}
                >
                  {element.feature_description}
                </m.div>
              )}
            </div>

            {element.description && isModalMounted && (
              <div className="relative z-10">
                <AnimatedTextOnScroll
                  key={`animated-text-${element.id}-${isModalMounted}`}
                  text={element.description}
                  customScroller=".experience-modal"
                  containerRef={modalRef}
                />
              </div>
            )}

            {element.project_url && (
              <m.div className="relative z-10 w-1/4 self-center">
                <LinkButton
                  link={element.project_url}
                  text={locale === "fr" ? "Voir le site" : "See the website"}
                />
              </m.div>
            )}
          </div>
        </Waves>
      )}
    </m.div>
  );
}

"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import useIsMobile from "@/hooks/useIsMobile";
import { Formation } from "@/types/formation";

export default function FormationCard({
  element,
  index = 0,
}: {
  element: Formation;
  index?: number;
}) {
  const formation = element;
  const { locale } = useRouter();
  const isMobile = useIsMobile();

  const ref = useRef(null);
  const dateRef = useRef(null);
  const schoolRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef(null);
  const tagsRef = useRef(null);

  const [paragraphFragments, setParagraphFragments] = useState<string[]>([]);
  const paragraphRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: true, amount: 0 });
  const isDateInView = useInView(dateRef, {
    once: isMobile === true ? true : false,
    amount: 0.5,
  });
  const isSchoolInView = useInView(schoolRef, {
    once: isMobile === true ? true : false,
    amount: 0.5,
  });
  const isTitleInView = useInView(titleRef, {
    once: isMobile === true ? true : false,
    amount: 0.6,
  });
  const isTagsInView = useInView(tagsRef, {
    once: isMobile === true ? true : false,
    amount: 0.4,
  });
  const isParagraphInView = useInView(paragraphRef, {
    once: isMobile === true ? true : false,
    amount: 0.5,
  });

  const initialTransition = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : -30 },
    transition: { duration: 0.6, delay: 1.3 },
  };

  useLayoutEffect(() => {
    if (paragraphRef.current) {
      const text = formation.description;
      const fragments = text
        .split(/(?<=\S)(\,|\.\.\.([$$$$]\.?)?|\.)(?=\s|$)/)
        .map((fragment) => fragment?.trim())
        .filter(Boolean);
      setParagraphFragments(fragments);
    }
  }, [formation.description]);

  useEffect(() => {
    if (paragraphRef.current && !isParagraphInView) {
      const spans = paragraphRef.current.children;
      Array.from(spans).forEach((span) => {
        (span as HTMLElement).style.opacity = "0";
      });
    }
  }, [isParagraphInView]);

  const renderFragment = (fragment: string, index: number) => {
    const needsSpace = fragment.match(/(\,|\.\.\.([$$$$]\.?)?|\.)$/);
    return (
      <m.span
        key={index}
        style={{ display: "inline" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isParagraphInView ? 1 : 0,
          y: isParagraphInView ? 0 : 10,
        }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        {fragment}
        {needsSpace && " "}
      </m.span>
    );
  };

  const renderSchoolWord = (word: string, index: number) => {
    return (
      <m.span
        key={index}
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isSchoolInView ? 1 : 0,
          y: isSchoolInView ? 0 : -100,
        }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        className="block"
      >
        {word}
      </m.span>
    );
  };

  return (
    <AnimatePresence>
      <m.div
        ref={ref}
        {...initialTransition}
        className="flex w-full flex-col gap-8 rounded-lg text-white shadow-md md:h-[calc(100dvh-12rem)] md:min-w-max md:flex-row md:items-center md:gap-96"
      >
        <m.h2
          ref={schoolRef}
          className="max-w-min text-[3em] leading-none font-bold md:text-[16em]"
          style={{ wordSpacing: isMobile ? "" : "440px" }}
        >
          {formation.school.split(" ").map(renderSchoolWord)}
        </m.h2>
        <div className="flex w-full flex-col justify-center gap-y-8 md:h-full md:w-max">
          <m.p
            ref={dateRef}
            initial={{ opacity: 0, y: -30 }}
            animate={{
              opacity: isDateInView ? 1 : 0,
              y: isDateInView ? 0 : -30,
            }}
            transition={{ duration: 0.6 }}
            className="font-[ui-monospace] text-[3em] leading-[normal] font-extrabold md:text-[calc(10dvh+12em)]"
          >
            {new Date(formation.started_at)
              .toLocaleDateString(locale)
              .replaceAll("-", "/")}
          </m.p>
          {isMobile && (
            <m.p
              initial={{ opacity: 0, y: -30 }}
              animate={{
                opacity: isDateInView ? 1 : 0,
                y: isDateInView ? 0 : -30,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[ui-monospace] text-[3em] leading-[normal] font-extrabold md:text-[calc(10dvh+12em)]"
            >
              {(formation.finished_at &&
                new Date(formation.finished_at)
                  .toLocaleDateString(locale)
                  .replaceAll("-", "/")) ??
                "Present"}
            </m.p>
          )}
          <div className="flex w-full flex-col gap-y-4">
            <m.p
              ref={titleRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isTitleInView ? 1 : 0,
                y: isTitleInView ? 0 : 10,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="self-start text-left text-2xl md:text-4xl"
            >
              {formation.title}
            </m.p>
            <m.div
              ref={tagsRef}
              className="flex w-full flex-wrap gap-x-4 text-xl md:w-auto md:flex-nowrap md:self-end md:text-right md:text-2xl"
            >
              {formation.skills &&
                formation.skills.map((skill, index) => (
                  <m.p
                    key={`skill-${skill}-${formation.title}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isTagsInView ? 1 : 0,
                      y: isTagsInView ? 0 : 10,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isTagsInView ? index * 0.1 : 0,
                    }}
                  >
                    {skill}
                  </m.p>
                ))}
            </m.div>
          </div>
          {!isMobile && (
            <m.p
              initial={{ opacity: 0, y: -30 }}
              animate={{
                opacity: isDateInView ? 1 : 0,
                y: isDateInView ? 0 : -30,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[ui-monospace] text-[3em] leading-[normal] font-extrabold md:text-[calc(10dvh+12em)]"
            >
              {(formation.finished_at &&
                new Date(formation.finished_at)
                  .toLocaleDateString(locale)
                  .replaceAll("-", "/")) ??
                "Present"}
            </m.p>
          )}
        </div>
        <m.div
          ref={paragraphRef}
          className="w-full max-w-screen text-xl leading-10 tracking-widest whitespace-break-spaces md:w-lg md:text-[clamp(12px,calc(0.5vh+1em),42px)]"
          style={{
            marginTop: index % 2 === 0 ? "auto" : "0",
            marginBottom: !(index % 2 === 0) ? "auto" : "0",
            opacity: isParagraphInView ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {paragraphFragments.map(renderFragment)}
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}

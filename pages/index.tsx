import { m } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

import LinkButton from "@/components/linkButton";
import PresentationText from "@/components/presentationText";
import { useTransitionState } from "@/context/TransitionContext";
import useIsMobile from "@/hooks/useIsMobile";

const SplashCursor = dynamic(
  () => import("@/components/react-bits/SplashCursor"),
  { ssr: false }
);
import { Me } from "@/types/me";

const apparitionVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
} as const;

const apparitionTransition1 = {
  duration: 1,
  delay: 0.6,
} as const;

const apparitionTransition2 = {
  duration: 1,
  delay: 0.9,
} as const;

import { me as meEn } from "@/data/en/me";
import { me as meFr } from "@/data/fr/me";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      locale,
    },
  };
}

export default function Home({ locale }: { locale: string }) {
  const me = locale === "en" ? meEn : meFr;
  const description = useMemo<(string | ReactNode)[]>(() => {
    if (!me) return [];
    if (typeof me.description === "string") {
      return me.description.split("\n");
    }
    return me.description;
  }, [me]);
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>Romain Laurent - Portfolio</title>
        <meta
          name="description"
          content="I'm a french young developer. I love frontend development, design, art, and discovering cultures. Let me know if you need my services !"
        />
      </Head>
      {isMobile ? (
        <MobileView me={me} description={description} />
      ) : (
        <DesktopView me={me} description={description} />
      )}
    </>
  );
}

function MobileView({
  me,
  description,
}: {
  me: Me;
  description: (string | ReactNode)[];
}) {
  const router = useRouter();
  const language = router.locale;
  const { isTransitioning } = useTransitionState();

  return (
    <m.div className="relative flex w-screen max-w-screen flex-col items-center justify-start">
      <div className="flex h-screen max-h-screen w-full flex-col items-center gap-y-4">
        <m.h1
          initial="hidden"
          animate={!isTransitioning ? "visible" : "hidden"}
          variants={apparitionVariants}
          transition={apparitionTransition1}
          className="mt-[40dvh] text-center text-4xl font-extrabold text-white md:text-9xl"
        >
          {me.fullname}
        </m.h1>
        <m.h2
          initial="hidden"
          animate={!isTransitioning ? "visible" : "hidden"}
          variants={apparitionVariants}
          transition={apparitionTransition2}
          className="text-center text-xl font-medium text-white"
        >
          {me.job}
        </m.h2>
      </div>
      {description.map((paragraph, index) => (
        <div key={index} className="relative w-full max-w-screen">
          <PresentationText
            text={paragraph}
            image={
              me.images[index]?.formats.large ||
              me.images[index]?.formats.medium ||
              me.images[index]?.formats.small ||
              me.images[index]?.formats.thumbnail
            }
            index={index}
          />
        </div>
      ))}
      <div className="flex h-screen w-full flex-col items-center justify-center gap-y-8 md:px-4">
        <p className="text-center text-4xl font-extrabold md:text-9xl">
          {language === "fr" ? "Et je suis" : "And I am"}{" "}
          <strong
            className={`${me.status === "available" ? "text-green-600" : "text-red-800"}`}
          >
            {language === "fr" && me.status === "available"
              ? "disponible"
              : language === "fr" && me.status !== "available"
                ? "en train de travailler"
                : me.status}
          </strong>
        </p>
        {me.status === "working" && (
          <p className="text-center text-xl font-medium">
            {language === "fr"
              ? "Mais vous pouvez toujours me contacter pour un projet futur"
              : "But you can still contact me for future projects"}
          </p>
        )}
        <p className="text-center text-xl font-medium">
          {language === "fr" ? "Alooooors" : "Soooo"}...
        </p>
        <div className="w-1/2">
          <LinkButton
            text={language === "fr" ? "contactez-moi" : "contact me"}
            link="mailto:dev@romain-laurent.fr"
          />
        </div>
      </div>
    </m.div>
  );
}

function DesktopView({
  me,
  description,
}: {
  me: Me;
  description: (string | ReactNode)[];
}) {
  const router = useRouter();
  const language = router.locale;
  const { isTransitioning } = useTransitionState();

  return (
    <m.div className="relative w-full min-w-screen">
      <m.div
        className="flex h-screen w-full flex-col items-center justify-center gap-y-10"
        style={{ scrollSnapAlign: "center" }}
      >
        <SplashCursor />
        <m.h1
          initial="hidden"
          animate={!isTransitioning ? "visible" : "hidden"}
          variants={apparitionVariants}
          transition={apparitionTransition1}
          className="text-center text-4xl font-extrabold text-white md:text-9xl"
        >
          {me.fullname}
        </m.h1>
        <m.h2
          initial="hidden"
          animate={!isTransitioning ? "visible" : "hidden"}
          variants={apparitionVariants}
          transition={apparitionTransition2}
          className="text-center text-xl font-medium text-white"
        >
          {me.job}
        </m.h2>
      </m.div>
      {description.map((paragraph, index) => (
        <PresentationText
          key={`paragraph-${index}`}
          text={paragraph}
          image={
            me.images[index]?.formats.large ||
            me.images[index]?.formats.medium ||
            me.images[index]?.formats.small ||
            me.images[index]?.formats.thumbnail
          }
          index={index}
        />
      ))}
      <div
        id="contact"
        className="relative flex h-screen flex-col items-center justify-center gap-y-10"
        style={{ scrollSnapAlign: "center" }}
      >
        <p className="text-center text-9xl font-extrabold">
          {language === "fr" ? "Et je suis" : "And I am"}{" "}
          <strong
            className={`${me.status === "available" ? "text-green-600" : "text-red-800"}`}
          >
            {language === "fr" && me.status === "available"
              ? "disponible"
              : language === "fr" && me.status !== "available"
                ? "en train de travailler"
                : me.status}
          </strong>
        </p>
        {me.status === "working" && (
          <p className="text-center text-xl font-medium">
            {language === "fr"
              ? "Mais vous pouvez toujours me contacter pour un projet futur"
              : "But you can still contact me for future projects"}
          </p>
        )}
        <p className="text-center text-xl font-medium">
          {language === "fr" ? "Alooooors" : "Soooo"}...
        </p>
        <div className="z-6 w-1/4">
          <LinkButton
            text={language === "fr" ? "contactez-moi" : "contact me"}
            link="mailto:dev@romain-laurent.fr"
          />
        </div>
        <SplashCursor />
      </div>
    </m.div>
  );
}

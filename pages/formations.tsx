import Head from "next/head";

import FormationCard from "@/components/formationCard";
import HorizontalScrollingContainer from "@/components/horizontalScrollingContainer";
import MobileContainer from "@/components/mobileContainer";
import MobileOrDesktop from "@/components/mobileOrDesktop";
import { formations as formationsEn } from "@/data/en/formations";
import { formations as formationsFr } from "@/data/fr/formations";
import { Formation } from "@/types/formation";

export async function getStaticProps({ locale }: { locale: string }) {
  const formations = locale === "en" ? formationsEn : formationsFr;

  return {
    props: {
      formations,
      locale,
    },
  };
}

export default function Formations({
  formations,
  locale,
}: {
  formations: Formation[];
  locale: string;
}) {
  return (
    <>
      <Head>
        <title>Romain Laurent - Formations</title>
        <meta
          name="description"
          content="I started learning development in 2019 in highschool, I never stopped learning new things, and my development studies were the best years I had in a school"
        />
      </Head>
      {formations && (
        <MobileOrDesktop
          mobile={() => (
            <MobileContainer
              list={formations.sort(
                (a, b) =>
                  new Date(b.started_at).getTime() -
                  new Date(a.started_at).getTime()
              )}
              title={locale === "fr" ? "Formations" : "School Formations"}
              CardComponent={FormationCard}
            />
          )}
          desktop={() => (
            <HorizontalScrollingContainer
              list={formations.sort(
                (a, b) =>
                  new Date(b.started_at).getTime() -
                  new Date(a.started_at).getTime()
              )}
              title={locale === "fr" ? "Formations" : "School Formations"}
              CardComponent={FormationCard}
            />
          )}
        />
      )}
    </>
  );
}

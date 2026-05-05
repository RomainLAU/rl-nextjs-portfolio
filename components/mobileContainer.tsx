import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/router";

import LinkButton from "./linkButton";

export default function MobileContainer({
  list,
  title,
  CardComponent,
}: {
  list: any[];
  title: string;
  CardComponent: React.ComponentType<any>;
}) {
  const locale = useRouter().locale;

  return (
    <div className="flex w-[calc(100vw-2rem)] max-w-screen flex-col gap-8 overflow-hidden px-4 py-24">
      <AnimatePresence>
        <m.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-4xl font-extrabold"
        >
          {title}
        </m.h2>
      </AnimatePresence>
      {list.map((element: any, index: number) => (
        <CardComponent key={`component-${element.id}`} element={element} index={index} />
      ))}
      <m.div
        id="contact"
        className="flex h-[80dvh] items-center justify-center"
      >
        <LinkButton
          text={locale === "fr" ? "contactez-moi" : "contact me"}
          link="mailto:dev@romain-laurent.fr"
        />
      </m.div>
    </div>
  );
}

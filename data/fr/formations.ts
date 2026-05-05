import { Formation } from "@/types/formation";
import { enforceUnique } from "@/types/utils";

export const formations: Formation[] = [
  {
    id: "epitech-digital",
    school: "Epitech Digital",
    started_at: "2021-10-11",
    finished_at: "2023-09-14",
    title: "Bachelor manager de projet Web spécialisé en web development",
    description:
      "Durant ma formation, j'ai acquis des compétences en développement web avec divers langages tels que HTML, CSS, PHP, JavaScript, Python et Ruby. À travers de nombreux projets de groupe en collaboration avec les filières de Web Design et Web Marketing, j'ai pu simuler des situations professionnelles, enrichissant ainsi ma compréhension des synergies entre nos expertises. Par la suite, j'ai approfondi mes connaissances en frameworks et technologies modernes, notamment ReactJS, VueJS, TypeScript, NodeJS, MySQL, Django, Symfony et Laravel, me préparant ainsi à relever des défis variés dans le monde du développement web.",
    skills: [
      "Django",
      "Figma",
      "Git",
      "HTML/CSS",
      "JavaScript",
      "Linux",
      "MySQL",
      "PHP",
      "PostgreSQL",
      "Python",
      "ReactJS",
      "Symfony",
      "TypeScript",
      "VueJS",
    ],
  },
  {
    id: "iim-digital-school",
    school: "IIM Digital School",
    started_at: "2023-09-18",
    finished_at: "2024-09-06",
    title: "Bachelor Coding et Digital innovation",
    description:
      "J'ai décidé de changer d'école pour terminer mon bachelor dans cet établissement, attiré par la qualité de l'enseignement et les opportunités offertes. J'y ai eu l'occasion de développer mes compétences en tant que chef de projet à travers divers projets de groupe, tout en approfondissant mes connaissances techniques en ReactJS, VueJS, Symfony et Laravel. Cette formation m'a permis de me familiariser avec le travail en équipe et de renforcer mes capacités en développement web.",
    skills: [
      "Figma",
      "Git",
      "HTML/CSS",
      "JavaScript",
      "NextJS",
      "PHP",
      "PostgreSQL",
      "Python",
      "ReactJS",
      "Symfony",
      "TypeScript",
      "VueJS",
    ],
  },
  {
    id: "cours-secondaire-d-orsay",
    school: "Cours Secondaire d'Orsay",
    started_at: "2006-09-04",
    finished_at: "2021-06-17",
    title: "Baccalauréat général",
    description:
      "J'ai suivi une spécialité en Arts Plastiques et NSI (Numériques & Sciences Informatiques), ainsi que des options en mathématiques et en italien, avec mention Bien. En NSI, un projet marquant a été la création d'un escape game en 3D durant le confinement, où j'ai développé le jeu sur Unreal Engine en suivant de nombreux tutoriels. En arts plastiques, j'ai réalisé plusieurs projets visuels sur ma calculatrice grâce à Python, en m'inspirant des idées d'un ami, ce qui m'a permis d'explorer de nouvelles approches créatives.",
    skills: ["HTML/CSS", "JavaScript", "MySQL", "PHP", "Python"],
  },
];

enforceUnique(formations);

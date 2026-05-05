import { Formation } from "@/types/formation";
import { enforceUnique } from "@/types/utils";

export const formations: Formation[] = [
  {
    id: "epitech-digital",
    school: "Epitech Digital",
    started_at: "2021-10-11",
    finished_at: "2023-09-14",
    title: "Bachelor in web project management specializing in web development",
    description:
      "During this training, I learned to develop in various web languages such as HTML/CSS, PHP, JavaScript, Python, and Ruby. I regularly participated in group projects related to the two other fields of the school: Web Design and Web Marketing. These projects allowed us to simulate professional situations by combining our expertise. Later, I deepened my knowledge in ReactJS, VueJS, TypeScript, NodeJS, MySQL, Django, Symfony, and Laravel.",
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
    title: "Bachelor Coding & Digital innovation",
    description:
      "I decided to change schools to complete my bachelor's degree at this institution, drawn by the quality of the education and the opportunities available. There, I had the chance to develop my skills as a project manager through various group projects, while also deepening my technical knowledge in ReactJS, VueJS, Symfony, and Laravel. This training allowed me to become familiar with teamwork and to strengthen my capabilities in web development.",
    skills: [
      "Figma",
      "Git",
      "HTML/CSS",
      "JavaScript",
      "MySQL",
      "PHP",
      "PostgreSQL",
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
    title: "General Baccalaureate",
    description:
      "I pursued a specialization in Visual Arts and Computer Science (NSI) with additional courses in mathematics and Italian, graduating with honors. A standout project in NSI was developing a 3D escape game during the COVID-19 lockdown, where I used Unreal Engine and followed numerous tutorials. In Visual Arts, I created several visual projects on my calculator using Python, drawing inspiration from discussions with a friend, which allowed me to explore new creative approaches.",
    skills: ["HTML/CSS", "PHP", "MySQL", "Python"],
  },
];

enforceUnique(formations);

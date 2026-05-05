import { Project } from "@/types/project";
import { enforceUnique } from "@/types/utils";

export const projects: Project[] = [
  {
    id: "alternative-spotify",
    title: "Alternative Spotify",
    description:
      "Pour un projet scolaire, j'ai eu l'occasion de recréer ma version de Spotify, en utilisant leur API. Ce projet m'a permis de découvrir VueJS, et d'approfondir mes connaissances en TypeScript et en TailwindCSS. J'ai pris beaucoup de plaisir à intégrer tous les détails qui me semblaient important dans l'expérience utilisateur connue de Spotify (musique en cours de lecture qui devient verte, bandeau en bas de l'écran avec les informations de la musique, pouvoir cliquer sur n'importe quel artiste pour découvrir ses musiques les plus écoutées...). J'ai aussi pris soin à rendre tout le projet utilisable sur mobile.",
    link: null,
    skills: ["VueJS", "TypeScript", "HTML/CSS", "Git"],
    images: [
      {
        name: "Capture d'écran 2024-09-15 à 02.56.21.png",
        alternativeText: null,
        width: 3596,
        height: 1836,
        formats: {
          large: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726361814/portfolio/Images/large_Capture_d_ecran_2024_09_15_a_02_56_21_af4ba093a8.png",
            name: "large_Capture d'écran 2024-09-15 à 02.56.21.png",
            width: 1000,
            height: 511,
          },
          small: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726361813/portfolio/Images/small_Capture_d_ecran_2024_09_15_a_02_56_21_af4ba093a8.png",
            name: "small_Capture d'écran 2024-09-15 à 02.56.21.png",
            width: 500,
            height: 255,
          },
          medium: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726361814/portfolio/Images/medium_Capture_d_ecran_2024_09_15_a_02_56_21_af4ba093a8.png",
            name: "medium_Capture d'écran 2024-09-15 à 02.56.21.png",
            width: 750,
            height: 383,
          },
          thumbnail: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726361813/portfolio/Images/thumbnail_Capture_d_ecran_2024_09_15_a_02_56_21_af4ba093a8.png",
            name: "thumbnail_Capture d'écran 2024-09-15 à 02.56.21.png",
            width: 245,
            height: 125,
          },
        },
        url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726361814/portfolio/Images/Capture_d_ecran_2024_09_15_a_02_56_21_af4ba093a8.png",
      },
    ],
  },
  {
    id: "masraf",
    title: "Masraf",
    description:
      "J'ai eu l'occasion de travailler sur une application bancaire à destination du marché français et belge. Ce projet m'a permis de découvrir et de développer une vraie maitrise de React Native étant donné que j'ai conçu la très grande majorité de l'application (environ 80% de l'app). En plus de l'application, j'ai aussi participé au développement de l'API, par exemple, en intégrant un service externe permettant l'identification des nouveaux membres inscrits.",
    link: null,
    skills: [
      "React Native",
      "TypeScript",
      "Figma",
      "Git",
      "HTML/CSS",
      "PostgreSQL",
    ],
    images: [
      {
        name: "Image_from_Romain_Laurent_1.png",
        alternativeText: null,
        width: 414,
        height: 896,
        formats: {
          small: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726362517/portfolio/Images/small_Image_from_Romain_Laurent_1_9ddc422d3b.png",
            name: "small_Image_from_Romain_Laurent_1.png",
            width: 231,
            height: 500,
          },
          medium: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726362517/portfolio/Images/medium_Image_from_Romain_Laurent_1_9ddc422d3b.png",
            name: "medium_Image_from_Romain_Laurent_1.png",
            width: 347,
            height: 750,
          },
          thumbnail: {
            url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726362517/portfolio/Images/thumbnail_Image_from_Romain_Laurent_1_9ddc422d3b.png",
            name: "thumbnail_Image_from_Romain_Laurent_1.png",
            width: 72,
            height: 156,
          },
        },
        url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1726362517/portfolio/Images/Image_from_Romain_Laurent_1_9ddc422d3b.png",
      },
    ],
  },
];

enforceUnique(projects);

import React from "react";

import {
  AloneText,
  ColoredText,
  EnergyText,
  FunnyText,
  OutsideText,
  RotatingText,
  Smiley,
} from "@/components/about-effects";
import { Me } from "@/types/me";

export const me: Me = {
  fullname: "Romain LAURENT",
  job: "Frontend Developer",
  status: "available",
  description: [
    <React.Fragment key="p1">
      I am a young and curious developer
    </React.Fragment>,
    <React.Fragment key="p2">
      I love implementing beautiful designs
    </React.Fragment>,
    <React.Fragment key="p3">But also working on APIs</React.Fragment>,
    <React.Fragment key="p4">
      I like working on captivating projects
    </React.Fragment>,
    <div
      key="p5"
      className="flex flex-wrap items-center justify-center gap-x-10"
    >
      Projects that give me <Smiley /> when working
    </div>,
    <div key="p6" className="time w-full text-center">
      Projects where I feel my time is being used for something
    </div>,
    <div key="p7" className="smiles w-full text-center">
      I like to work with great people
    </div>,
    <React.Fragment key="p8">
      But I also enjoy working <AloneText>alone</AloneText>
    </React.Fragment>,
    <React.Fragment key="p9">
      I like <strong className="peaceful">calm</strong> and{" "}
      <strong className="peaceful">discreet</strong> people
    </React.Fragment>,
    <div key="p10" className="energyText w-full text-center">
      But also <FunnyText>funny</FunnyText> and <EnergyText>energetic</EnergyText>{" "}
      people
    </div>,
    <React.Fragment key="p11">I like staying at home ⌂</React.Fragment>,
    <React.Fragment key="p12">
      But I also want to see <OutsideText>the outside</OutsideText>
    </React.Fragment>,
    <React.Fragment key="p13">
      I love <ColoredText>colors</ColoredText>
    </React.Fragment>,
    <React.Fragment key="p14">
      But also <RotatingText variant="whiteBackground">black</RotatingText> and{" "}
      <RotatingText variant="blackBackground">white</RotatingText>
    </React.Fragment>,
  ],
  images: [
    {
      name: "Photo CV Romain Laurent.webp",
      alternativeText: "photo-of-myself",
      width: 2848,
      height: 4288,
      formats: {
        large: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/large_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
          name: "large_Photo CV Romain Laurent.webp",
          width: 664,
          height: 1000,
        },
        small: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/small_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
          name: "small_Photo CV Romain Laurent.webp",
          width: 332,
          height: 500,
        },
        medium: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/medium_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
          name: "medium_Photo CV Romain Laurent.webp",
          width: 498,
          height: 750,
        },
        thumbnail: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/thumbnail_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
          name: "thumbnail_Photo CV Romain Laurent.webp",
          width: 104,
          height: 156,
        },
      },
    },
    {
      name: "Web Mockup Icon.png",
      alternativeText: "mockups-illustration",
      width: 549,
      height: 351,
      formats: {
        small: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/small_Web_Mockup_Icon_eb4b36d59d.png",
          name: "small_Web Mockup Icon.png",
          width: 500,
          height: 320,
        },
        thumbnail: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/thumbnail_Web_Mockup_Icon_eb4b36d59d.png",
          name: "thumbnail_Web Mockup Icon.png",
          width: 244,
          height: 156,
        },
        large: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/small_Web_Mockup_Icon_eb4b36d59d.png",
          name: "small_Web Mockup Icon.png",
          width: 500,
          height: 320,
        },
        medium: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/small_Web_Mockup_Icon_eb4b36d59d.png",
          name: "small_Web Mockup Icon.png",
          width: 500,
          height: 320,
        },
      },
    },
    {
      name: "api-image.png",
      alternativeText: "",
      width: 2405,
      height: 1792,
      formats: {
        large: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/large_api_image_acc796ea41.png",
          name: "large_api-image.png",
          width: 1000,
          height: 745,
        },
        small: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/small_api_image_acc796ea41.png",
          name: "small_api-image.png",
          width: 500,
          height: 373,
        },
        medium: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/medium_api_image_acc796ea41.png",
          name: "medium_api-image.png",
          width: 750,
          height: 559,
        },
        thumbnail: {
          url: "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/thumbnail_api_image_acc796ea41.png",
          name: "thumbnail_api-image.png",
          width: 209,
          height: 156,
        },
      },
    },
  ],
};

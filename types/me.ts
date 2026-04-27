import React from "react";

export type MediaFormat = {
  url: string;
  width: number;
  height: number;
  name: string;
  hash?: string;
};

export type Me = {
  fullname: string;
  description: string | React.ReactNode[];
  job: string;
  status: "available" | "working";
  images: {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      large: MediaFormat;
      small: MediaFormat;
      medium: MediaFormat;
      thumbnail: MediaFormat;
    };
  }[];
};

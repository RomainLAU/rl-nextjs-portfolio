import { Skill } from "./skill";

export type ProjectImage = {
  name: string;
  alternativeText: string | null;
  width: number;
  height: number;
  url: string;
  formats?: Record<string, { url: string; width: number; height: number; name: string; path?: string | null }> | null;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  link: string | null;
  skills: Skill[];
  images: ProjectImage[];
};

import { Skill } from "./skill";

export type MediaAsset = {
  url: string;
  mime: string;
  name?: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: Record<string, { url: string; width: number; height: number; name: string; path?: string | null }> | null;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  company_logo: {
    name?: string;
    alternativeText: string | null;
    width: number | null;
    height: number | null;
    url: string;
  } | null;
  contract: string;
  description: string;
  skills: Skill[];
  started_at: string;
  finished_at?: string;
  project_url?: string | null;
  feature_description?: string;
  feature_media?: MediaAsset | null;
};

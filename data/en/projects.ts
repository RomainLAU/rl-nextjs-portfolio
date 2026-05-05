import { Project } from "@/types/project";
import { enforceUnique } from "@/types/utils";

export const projects: Project[] = [];

enforceUnique(projects);

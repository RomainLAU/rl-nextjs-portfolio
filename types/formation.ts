import { Skill } from './skill'

export type Formation = {
    id: number
    school: string
    title: string
    description: string
    skills: Skill[]
    started_at: string
    finished_at?: string
}

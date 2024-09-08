export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.romain-laurent.fr/api'

const endpoints = {
    experiences: ({ locale }: { locale: string }) => `${API_BASE_URL}/experiences?populate=*&locale=${locale}`,
    experienceById: ({ id, locale }: { id: number; locale: string }) => `${API_BASE_URL}/experiences/${id}populate=*&?locale=${locale}`,
    formations: ({ locale }: { locale: string }) => `${API_BASE_URL}/formations?populate=*&locale=${locale}`,
    formationById: ({ id, locale }: { id: number; locale: string }) => `${API_BASE_URL}/formations/${id}populate=*&?locale=${locale}`,
    projects: ({ locale }: { locale: string }) => `${API_BASE_URL}/projects?populate=*&locale=${locale}`,
    projectById: ({ id, locale }: { id: number; locale: string }) => `${API_BASE_URL}/projects/${id}populate=*&?locale=${locale}`,
    skills: ({ locale }: { locale: string }) => `${API_BASE_URL}/skills?populate=*&locale=${locale}`,
    skillById: ({ id, locale }: { id: number; locale: string }) => `${API_BASE_URL}/skills/${id}populate=*&?locale=${locale}`,
    me: ({ locale }: { locale: string }) => `${API_BASE_URL}/us?populate=*&locale=${locale}`,
}

export default endpoints

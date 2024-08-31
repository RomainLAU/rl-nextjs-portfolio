export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.romain-laurent.fr/api'

const endpoints = {
    experiences: ({ locale }: { locale: string }) => `${API_BASE_URL}/experiences?populate=*&locale=${locale}`,
    experienceById: ({ id, locale }: { id: number; locale: string }) => `${API_BASE_URL}/experiences/${id}populate=*&?locale=${locale}`,
}

export default endpoints

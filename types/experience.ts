export type Experience = {
    id: number
    title: string
    company: string
    company_logo: {
        alternativeText: string
        caption: string
        createdAt: string
        ext: string
        formats: any
        hash: string
        width: number
        height: number
        id: number
        mime: string
        name: string
        previewUrl: string
        provider: string
        provider_metadata: string
        size: number
        updatedAt: string
        url: string
    }
    contract: string
    description: string
    started_at: string
    finished_at?: string
}

export type Me = {
    fullname: string
    description: string
    job: string
    status: 'available' | 'working'
    images: {
        id: number
        name: string
        alternativeText: string
        caption: string
        width: number
        height: number
        formats: {
            large: {
                url: string
                hash: string
                name: string
                width: number
                height: number
            }
            small: {
                url: string
                hash: string
                name: string
                width: number
                height: number
            }
            medium: {
                url: string
                hash: string
                name: string
                width: number
                height: number
            }
            thumbnail: {
                url: string
                hash: string
                name: string
                width: number
                height: number
            }
        }
    }[]
}

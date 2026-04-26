import React from 'react'
import { Me } from '@/types/me'
import { 
    Smiley, 
    ColoredText, 
    RotatingText, 
    EnergyText, 
    OutsideText, 
    AloneText 
} from '@/components/about-effects'

export const me: Me = {
    fullname: "Romain LAURENT",
    job: "Frontend Developer",
    status: "available",
    description: [
        <React.Fragment key="p1">I&apos;m a young and very curious developer</React.Fragment>,
        <React.Fragment key="p2">I like integrating beautiful web designs</React.Fragment>,
        <React.Fragment key="p3">But also working on APIs time to time</React.Fragment>,
        <React.Fragment key="p4">I like to work on entertaining projects</React.Fragment>,
        <div key="p5" className="flex flex-wrap gap-x-10 items-center justify-center">
            Projects that give me <Smiley /> when working
        </div>,
        <div key="p6" className="time text-center w-full">Projects where I feel my time is being used for something</div>,
        <div key="p7" className="smiles text-center w-full">I like to work with great people</div>,
        <React.Fragment key="p8">But I also like to work <AloneText>alone</AloneText></React.Fragment>,
        <React.Fragment key="p9">I like <strong className="peaceful">calm</strong> and <strong className="peaceful">quiet</strong> people</React.Fragment>,
        <div key="p10" className="energyText text-center w-full">But also <EnergyText>funny</EnergyText> and <EnergyText>energetic</EnergyText> people</div>,
        <React.Fragment key="p11">I like to stay at home ⌂</React.Fragment>,
        <React.Fragment key="p12">But I want to see the <OutsideText>outside</OutsideText></React.Fragment>,
        <React.Fragment key="p13">I like <ColoredText>colors</ColoredText></React.Fragment>,
        <React.Fragment key="p14">But also <RotatingText variant="whiteBackground">black</RotatingText> and <RotatingText variant="blackBackground">white</RotatingText></React.Fragment>
    ],
    images: [
        {
            "id": 9,
            "name": "Photo CV Romain Laurent.webp",
            "alternativeText": "photo-of-myself",
            "caption": "",
            "width": 2848,
            "height": 4288,
            "formats": {
                "large": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/large_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
                    "hash": "large_Photo_CV_Romain_Laurent_09cdf60dc6",
                    "name": "large_Photo CV Romain Laurent.webp",
                    "width": 664,
                    "height": 1000
                },
                "small": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/small_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
                    "hash": "small_Photo_CV_Romain_Laurent_09cdf60dc6",
                    "name": "small_Photo CV Romain Laurent.webp",
                    "width": 332,
                    "height": 500
                },
                "medium": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/medium_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
                    "hash": "medium_Photo_CV_Romain_Laurent_09cdf60dc6",
                    "name": "medium_Photo CV Romain Laurent.webp",
                    "width": 498,
                    "height": 750
                },
                "thumbnail": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/thumbnail_Photo_CV_Romain_Laurent_09cdf60dc6.webp",
                    "hash": "thumbnail_Photo_CV_Romain_Laurent_09cdf60dc6",
                    "name": "thumbnail_Photo CV Romain Laurent.webp",
                    "width": 104,
                    "height": 156
                }
            }
        },
        {
            "id": 35,
            "name": "Web Mockup Icon.png",
            "alternativeText": "mockups-illustration",
            "caption": "",
            "width": 549,
            "height": 351,
            "formats": {
                "small": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/small_Web_Mockup_Icon_eb4b36d59d.png",
                    "hash": "small_Web_Mockup_Icon_eb4b36d59d",
                    "name": "small_Web Mockup Icon.png",
                    "width": 500,
                    "height": 320
                },
                "thumbnail": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/thumbnail_Web_Mockup_Icon_eb4b36d59d.png",
                    "hash": "thumbnail_Web_Mockup_Icon_eb4b36d59d",
                    "name": "thumbnail_Web Mockup Icon.png",
                    "width": 244,
                    "height": 156
                },
                "large": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/small_Web_Mockup_Icon_eb4b36d59d.png",
                    "hash": "small_Web_Mockup_Icon_eb4b36d59d",
                    "name": "small_Web Mockup Icon.png",
                    "width": 500,
                    "height": 320
                },
                "medium": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725755449/portfolio/Images/small_Web_Mockup_Icon_eb4b36d59d.png",
                    "hash": "small_Web_Mockup_Icon_eb4b36d59d",
                    "name": "small_Web Mockup Icon.png",
                    "width": 500,
                    "height": 320
                }
            }
        },
        {
            "id": 36,
            "name": "api-image.png",
            "alternativeText": "",
            "caption": "",
            "width": 2405,
            "height": 1792,
            "formats": {
                "large": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/large_api_image_acc796ea41.png",
                    "hash": "large_api_image_acc796ea41",
                    "name": "large_api-image.png",
                    "width": 1000,
                    "height": 745
                },
                "small": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/small_api_image_acc796ea41.png",
                    "hash": "small_api_image_acc796ea41",
                    "name": "small_api-image.png",
                    "width": 500,
                    "height": 373
                },
                "medium": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/medium_api_image_acc796ea41.png",
                    "hash": "medium_api_image_acc796ea41",
                    "name": "medium_api-image.png",
                    "width": 750,
                    "height": 559
                },
                "thumbnail": {
                    "url": "https://res.cloudinary.com/dtsvpdh37/image/upload/v1725757060/portfolio/Images/thumbnail_api_image_acc796ea41.png",
                    "hash": "thumbnail_api_image_acc796ea41",
                    "name": "thumbnail_api-image.png",
                    "width": 209,
                    "height": 156
                }
            }
        }
    ]
}

import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { VscChromeClose } from 'react-icons/vsc';

export default function DescriptionModal({ element, setSelectedElement }: { element: any; setSelectedElement: React.Dispatch<any> }) {
    if (!element) return null

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`w-screen h-screen sticky top-0 left-0 bg-black/5 z-[1000]`}>
                <div className='w-[80%] absolute top-[10%] left-[10%] bg-red-950 rounded-3xl p-24'>
                    <VscChromeClose onClick={() => setSelectedElement(null)} className='text-4xl mix-blend-difference absolute top-8 right-8' />
                    {element.company_logo && (
                        <m.div className={`w-[80vw] md:w-full h-[40vh] md:h-full md:max-h-[50dvh] ${element.company === 'COM4DESIGN' ? 'svg-container' : ''}`}>
                            <Image
                                src={element.company_logo.url}
                                alt={element.company_logo.alternativeText}
                                width={element.company_logo.width}
                                height={element.company_logo.height}
                                className='svg-image w-auto h-full'
                                // quality={isMobile ? 50 : 100}
                                // priority={isInView}
                            />
                        </m.div>
                    )}
                </div>
            </m.div>
        </AnimatePresence>
    )
}

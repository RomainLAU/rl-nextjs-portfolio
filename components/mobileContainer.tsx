import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import LinkButton from './linkButton';

export default function MobileContainer({ list, title, CardComponent }: { list: any[]; title: string; CardComponent: React.ComponentType<any> }) {
    const locale = useRouter().locale

    return (
        <div className='w-[calc(100vw-2rem)] max-w-screen overflow-hidden flex flex-col px-4 py-24 gap-24'>
            {list.map((element: any) => (
                <CardComponent key={`component-${element.id}`} element={element} />
            ))}
            <motion.div className='flex items-center justify-center h-[80dvh]'>
                <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
            </motion.div>
        </div>
    )
}

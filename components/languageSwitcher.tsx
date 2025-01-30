import { useRouter } from 'next/router';

import useIsMobile from '@/hooks/useIsMobile';

export default function LanguageSwitcher() {
    const router = useRouter()
    const isMobile = useIsMobile() ?? true
    const { pathname, asPath, query, locale, locales } = router

    return (
        <div className='flex space-x-2'>
            <select
                aria-label='language-switcher'
                onChange={(e) => router.push({ pathname, query }, asPath, { locale: e.target.value })}
                defaultValue={locale}
                className={`outline-hidden bg-black! link ${isMobile ? 'mobile-link' : ''}`}>
                {locales?.map((element) => (
                    <option aria-label={`switch-to-${element}`} key={element} value={element}>
                        {element}
                    </option>
                ))}
            </select>
        </div>
    )
}

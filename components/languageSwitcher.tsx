import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
    const router = useRouter()
    const { pathname, asPath, query, locale, locales } = router

    return (
        <div className='flex space-x-2'>
            <select
                onChange={(e) => router.push({ pathname, query }, asPath, { locale: e.target.value })}
                defaultValue={locale}
                className='bg-transparent outline-none !bg-black link'>
                {locales?.map((element) => (
                    <option key={element} value={element}>
                        {element}
                    </option>
                ))}
            </select>
        </div>
    )
}

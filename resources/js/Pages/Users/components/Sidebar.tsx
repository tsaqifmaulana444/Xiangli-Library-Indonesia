import { Link, usePage } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Sidebar() {
    const { component } = usePage()
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    return (
        <>
            <aside className='bg-[#17171B] w-[17%] h-[100vh] sticky top-0'>
                <div className="flex items-center w-[70%] mx-auto mt-10">
                    <img src="/ukk12-fe/images/logo.svg" alt="Xiangli Logo" className='w-[23%]' />
                    <p className="text-white ml-4 text-[20px]">{t('xiangli')}</p>
                </div>
                <div className="flex flex-col w-[70%] mx-auto mt-4 h-[80%] justify-between">
                    <div className="flex flex-col">
                        <Link href="/dashboard" className={component === 'Users/User' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar1')}</Link>
                        <Link href="/list-book" className={component === 'Users/ListBook' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar2')}</Link>
                        <Link href="/history" className={component === 'Users/History' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar3')}</Link>
                        <Link href="/bookmark" className={component === 'Users/History' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Bookmark</Link>
                    </div>
                    <div className="">
                        <Link href='/sign-out' as='button' className='cursor-pointer text-gray-400 text-[16px] font-semibold mt-6' method="post">{t('sign_out')}</Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

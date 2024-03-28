import { Link, usePage } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Sidebar() {
    const { component } = usePage()
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    return (
        <>
            <aside className='bg-[#17171B] w-[17%] h-[100vh] sticky top-0'>
                <div className="flex items-center w-[70%] mx-auto mt-10">
                    <img src="/ukk12-fe/images/logo.svg" alt="Xiangli Logo" className='w-[23%]' />
                    <div>
                        <p className="text-white ml-4 text-[20px]">{t('xiangli')}</p>
                        <p className="text-white ml-4 text-[11px] -mt-1">{t('spadmin')}</p>
                    </div>
                </div>
                <div className="flex flex-col w-[70%] mx-auto mt-4 h-[80%] justify-between">
                    <div className="flex flex-col">
                        <Link href="/super-admin/dashboard" className={component === 'SuperAdmin/Dashboard' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar1')}</Link>
                        <Link href="/super-admin/books-panel" className={component === 'SuperAdmin/BooksPanel' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar6')}</Link>
                        <Link href="/super-admin/categories" className={component === 'SuperAdmin/Categories' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar7')}</Link>
                        <Link href="/super-admin/admins" className={component === 'SuperAdmin/Admins' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>{t('sidebar8')}</Link>
                    </div>
                    <div className="">
                        <Link href='/sign-out' as='button' className='cursor-pointer text-gray-400 text-[16px] font-semibold mt-6' method="post">{t('sign_out')}</Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

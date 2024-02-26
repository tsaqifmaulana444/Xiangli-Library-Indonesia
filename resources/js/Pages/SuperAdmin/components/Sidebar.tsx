import { Link, usePage } from '@inertiajs/react'

export default function Sidebar() {
    const { component } = usePage()
    return (
        <>
            <aside className='bg-[#17171B] w-[17%] h-[100vh] sticky top-0'>
                <div className="flex items-center w-[70%] mx-auto mt-10">
                    <img src="/ukk12-fe/images/logo.svg" alt="Xiangli Logo" className='w-[23%]' />
                    <div>
                        <p className="text-white ml-4 text-[20px]">Xiangli</p>
                        <p className="text-white ml-4 text-[11px] -mt-1">Super Admin Panel</p>
                    </div>
                </div>
                <div className="flex flex-col w-[70%] mx-auto mt-4">
                    <Link href="/super-admin/dashboard" className={component === 'SuperAdmin/Dashboard' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Dashboard</Link>
                    <Link href="/super-admin/books-panel" className={component === 'SuperAdmin/BooksPanel' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Books Panel</Link>
                    <Link href="/super-admin/admins" className={component === 'SuperAdmin/Admins' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Admins</Link>
                </div>
            </aside>
        </>
    )
}

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
                        <p className="text-white ml-4 text-[11px] -mt-1">Admin Panel</p>
                    </div>
                </div>
                <div className="flex flex-col w-[70%] mx-auto mt-4">
                    <Link href="/admin/dashboard" className={component === 'Admin/Dashboard' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Dashboard</Link>
                    <Link href="/admin/borrowers" className={component === 'Admin/Borrowers' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>List Of Borrowers</Link>
                    <Link href="/admin/members" className={component === 'Admin/Members' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Members</Link>
                    <Link href="/admin/books-panel" className={component === 'Admin/BooksPanel' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Books Panel</Link>
                    <Link href="/admin/categories" className={component === 'Admin/Categories' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Categories</Link>
                    <Link href="/categories" className={component === 'Users/Categories' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Feedback</Link>
                </div>
            </aside>
        </>
    )
}

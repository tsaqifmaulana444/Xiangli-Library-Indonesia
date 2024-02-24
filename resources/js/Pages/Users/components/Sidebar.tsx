import { Link, usePage } from '@inertiajs/react'

export default function Sidebar() {
    const { component } = usePage()
    console.log({"tes": component })
    return (
        <>
            <aside className='bg-[#17171B] w-[17%] h-[100vh] sticky top-0'>
                <div className="flex items-center w-[70%] mx-auto mt-10">
                    <img src="/ukk12-fe/images/logo.svg" alt="Xiangli Logo" className='w-[23%]' />
                    <p className="text-white ml-4 text-[20px]">Xiangli</p>
                </div>
                <div className="flex flex-col w-[70%] mx-auto mt-4">
                    <Link href="/dashboard" className={component === 'Users/User' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Dashboard</Link>
                    <Link href="/list-book" className={component === 'Users/ListBook' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>List Book</Link>
                    <Link href="/history" className={component === 'Users/History' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>History List</Link>
                    <Link href="/categories" className={component === 'Users/Categories' ? 'text-white text-[16px] font-semibold mt-6' : 'text-gray-400 text-[16px] font-semibold mt-6'}>Categories</Link>
                </div>
            </aside>
        </>
    )
}

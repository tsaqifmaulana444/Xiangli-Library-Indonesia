import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Dashboard() {
  const appName = "Dashboard"
  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <aside className='bg-[#17171B] w-[17%] h-[100vh] sticky top-0'>
          <div className="flex items-center w-[70%] mx-auto mt-10">
            <img src="/ukk12-fe/images/logo.svg" alt="Xiangli Logo" className='w-[23%]'/>
            <p className="text-white ml-4 text-[20px]">Xiangli</p>
          </div>
          <div className="flex flex-col w-[70%] mx-auto mt-4">
            <p className='text-white text-[16px] font-semibold mt-6'>Dashboard</p>
            <p className='text-gray-400 text-[16px] font-semibold mt-6'>List Book</p>
            <p className='text-gray-400 text-[16px] font-semibold mt-6'>History List</p>
            <p className='text-gray-400 text-[16px] font-semibold mt-6'>Categories</p>
          </div>
        </aside>
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <nav className='flex justify-between mt-6 items-center'>
              <p className='font-bold text-[25px]'>欢迎, Zhang Jianwei</p>
              <div className="">
                <img src="/images/pp.png" alt="" className='rounded-full w-[50px]'/>
              </div>
            </nav>
            <section className="flex justify-between mt-12">
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Active Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>20</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Active Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>20</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Active Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>20</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Active Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>20</h3>
              </div>
            </section>
            <section className="flex justify-between mt-6">
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>Recommended Book</p>
                <h3 className='mt-2 text-[25px] font-bold'>20</h3>
              </div>
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>Promosi</p>
              </div>
            </section>
            <section className="mt-4">
              <h1 className='font-bold text-[20px]'>Anything lah</h1>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

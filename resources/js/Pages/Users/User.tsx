import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Dashboard() {
  const appName = "Dashboard"
  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
       <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar />
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

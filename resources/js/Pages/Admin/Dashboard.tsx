import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

interface DashboardProps {
  members: number
  actives: number
  books: number
  categories: number
}

export default function Dashboard({ members, actives, books, categories, }: DashboardProps) {
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
                <p className='text-[14px]'>Total Users</p>
                <h3 className='mt-2 text-[25px] font-bold'>{members}</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Total Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>{books}</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Active Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>{actives}</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Total Categories</p>
                <h3 className='mt-2 text-[25px] font-bold'>{categories}</h3>
              </div>
            </section>
            <section className="flex justify-between mt-6">
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>Statistic</p>
              </div>
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>Report In Xlsx</p>
                <div className="flex justify-between mt-8">
                  <p className="font-bold">Book Report</p>
                  <a href="/admin/book_export" className='hover:underline'>Download</a>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="font-bold">Borrowing Report</p>
                  <a href="/admin/book_export" className='hover:underline'>Download</a>
                </div>
              </div>
            </section>
            <section className="mt-4">
              <h1 className='font-bold text-[20px]'>Books Stock</h1>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

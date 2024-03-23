import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

interface DashboardProps {
  actives: number
  books: number
  categories: number
  recommended: Book[]
  recommended2: Book[]
}

interface Book {
  id?: string
  name: string
  date: string
  author: string
  stock: string
  description: string
  image: string
  categories: string[]
}

export default function Dashboard({ actives, books, categories, recommended, recommended2 }: DashboardProps) {
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
              <div className="shadow-md rounded-md w-[31%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Active Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>{actives}</h3>
              </div>
              <div className="shadow-md rounded-md w-[31%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Total Borrowed Books</p>
                <h3 className='mt-2 text-[25px] font-bold'>{books}</h3>
              </div>
              <div className="shadow-md rounded-md w-[31%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>Books Category</p>
                <h3 className='mt-2 text-[25px] font-bold'>{categories}</h3>
              </div>
            </section>
            <section className="flex justify-between mt-6">
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>Recommended Book</p>
                {recommended2.map((recommend, index) => (
                  <div key={index}>
                    <img src={`/storage/book/${recommend.image.substring(recommend.image.lastIndexOf('/'))}`} alt="image" className='w-[70px]' />
                    <p>{recommend.name}</p>
                    <p>{recommend.author}</p>
                    <p>{`${recommend.description.substring(0, 100)}...`}</p>
                  </div> 
                ))}
              </div>
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>Top Picked Books</p>
                {recommended.map((recommend, index) => (
                  <div key={index}>
                    <img src={`/storage/book/${recommend.image.substring(recommend.image.lastIndexOf('/'))}`} alt="image" className='w-[70px]' />
                    <p>{recommend.name}</p>
                    <p>{recommend.author}</p>
                    <p>{`${recommend.description.substring(0, 100)}...`}</p>
                  </div> 
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

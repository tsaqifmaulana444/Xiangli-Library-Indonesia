import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Dashboard() {
  const appName = "List Book"
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
            <section className="">
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>List Of Our Available Book</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="shadow-md rounded-md w-[95%] p-5">
                  <img src="/images/book.png" alt="" className='w-full h-[150px] rounded-sm' />
                  <h3 className='text-[18px] font-bold mt-2'>企业管理书籍</h3>
                  <p className='text-[11px] my-1'>2018</p>
                  <p className='text-[13px]'>这本书是一本关于如何管理你的财务和让你的钱增值的书, 这本书的作者是著名的印度尼西亚亿万富翁张建伟, 他花了15年的时间研究科技在他的国家是如何发展的</p>
                </div>
                <div className="shadow-md rounded-md w-[95%] p-5">
                  <img src="/images/book.png" alt="" className='w-full h-[150px] rounded-sm' />
                  <h3 className='text-[18px] font-bold mt-2'>企业管理书籍</h3>
                  <p className='text-[11px] my-1'>2018</p>
                  <p className='text-[13px]'>这本书是一本关于如何管理你的财务和让你的钱增值的书, 这本书的作者是著名的印度尼西亚亿万富翁张建伟, 他花了15年的时间研究科技在他的国家是如何发展的</p>
                </div>
                <div className="shadow-md rounded-md w-[95%] p-5">
                  <img src="/images/book.png" alt="" className='w-full h-[150px] rounded-sm' />
                  <h3 className='text-[18px] font-bold mt-2'>企业管理书籍</h3>
                  <p className='text-[11px] my-1'>2018</p>
                  <p className='text-[13px]'>这本书是一本关于如何管理你的财务和让你的钱增值的书, 这本书的作者是著名的印度尼西亚亿万富翁张建伟, 他花了15年的时间研究科技在他的国家是如何发展的</p>
                </div>
                <div className="shadow-md rounded-md w-[95%] p-5">
                  <img src="/images/book.png" alt="" className='w-full h-[150px] rounded-sm' />
                  <h3 className='text-[18px] font-bold mt-2'>企业管理书籍</h3>
                  <p className='text-[11px] my-1'>2018</p>
                  <p className='text-[13px]'>这本书是一本关于如何管理你的财务和让你的钱增值的书, 这本书的作者是著名的印度尼西亚亿万富翁张建伟, 他花了15年的时间研究科技在他的国家是如何发展的</p>
                </div>
                <div className="shadow-md rounded-md w-[95%] p-5">
                  <img src="/images/book.png" alt="" className='w-full h-[150px] rounded-sm' />
                  <h3 className='text-[18px] font-bold mt-2'>企业管理书籍</h3>
                  <p className='text-[11px] my-1'>2018</p>
                  <p className='text-[13px]'>这本书是一本关于如何管理你的财务和让你的钱增值的书, 这本书的作者是著名的印度尼西亚亿万富翁张建伟, 他花了15年的时间研究科技在他的国家是如何发展的</p>
                </div>
                <div className="shadow-md rounded-md w-[95%] p-5">
                  <img src="/images/book.png" alt="" className='w-full h-[150px] rounded-sm' />
                  <h3 className='text-[18px] font-bold mt-2'>企业管理书籍</h3>
                  <p className='text-[11px] my-1'>2018</p>
                  <p className='text-[13px]'>这本书是一本关于如何管理你的财务和让你的钱增值的书, 这本书的作者是著名的印度尼西亚亿万富翁张建伟, 他花了15年的时间研究科技在他的国家是如何发展的</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

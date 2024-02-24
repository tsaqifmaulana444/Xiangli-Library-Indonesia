import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Categories() {
  const appName = "Categories"
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
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>Categories</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        1
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        企业管理书籍
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        2
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        企业管理书籍
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        3
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        企业管理书籍
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </section>
          </div>
        </main>
      </div>
    </>
  )
}

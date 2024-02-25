import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Members() {
  const appName = "Members"
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
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>Members</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Book Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Borrow Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Return Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        1
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        企业管理书籍
                      </td>
                      <td className="px-6 py-4 text-center">
                        4
                      </td>
                      <td className="px-6 py-4 text-center">
                        2024-01-01
                      </td>
                      <td className="px-6 py-4 text-center">
                        -
                      </td>
                      <td className="px-6 py-4 text-center">
                        Waiting
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Reject</button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Accept</button>

                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        2
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        企业管理书籍
                      </th>
                      <td className="px-6 py-4 text-center">
                        4
                      </td>
                      <td className="px-6 py-4 text-center">
                        2024-01-01
                      </td>
                      <td className="px-6 py-4 text-center">
                        -
                      </td>
                      <td className="px-6 py-4 text-center">
                        Waiting
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Reject</button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Accept</button>

                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        3
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        企业管理书籍
                      </th>
                      <td className="px-6 py-4 text-center">
                        4
                      </td>
                      <td className="px-6 py-4 text-center">
                        2024-01-01
                      </td>
                      <td className="px-6 py-4 text-center">
                        -
                      </td>
                      <td className="px-6 py-4 text-center">
                        Waiting
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Reject</button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Accept</button>
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

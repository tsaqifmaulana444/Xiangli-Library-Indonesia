import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CategoryModal from './modals/CategoryModal'
import { useState } from 'react'

interface Category {
  id?: string
  name: string
}

export default function Categories({ categories }: PageProps<{ categories: Category[] }>) {
  const appName = "Categories"
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  let [currentCount, setCurrentCount] = useState(1)
  
  const switchCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen)
  }

  return (
    <>
      {isCategoryModalOpen && <CategoryModal closeModal={switchCategoryModal}/>}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar />
            <section className="">
              <div className="flex justify-between">
                <h1 className='mt-4 mb-8 font-bold text-[22px]'>Categories</h1>
                <button type="button" onClick={switchCategoryModal} className="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mt-4 mb-8">Add Category</button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                    {categories.map((category) => (
                      <tr className="bg-white" key={category.id}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {currentCount++}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {category.name}
                        </td>
                      </tr>
                    ))}
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

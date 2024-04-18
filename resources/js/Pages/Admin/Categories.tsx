import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CategoryModal from './modals/CategoryModal'
import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Category {
  id?: string
  name: string
}

export default function Categories({ categories, name, email }: PageProps<{ categories: Category[], name: string, email: string }>) {
  const appName = "Categories"
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  let [currentCount, setCurrentCount] = useState(1)
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const switchCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen)
  }

  const deleteCategory = async (id: string | undefined) => {
    Inertia.delete(`/admin/categories/${id}`);
    toast.success('Data Successfully Deleted!')
  }

  return (
    <>
      {isCategoryModalOpen && <CategoryModal closeModal={switchCategoryModal} />}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar name={name} email={email} />
            <section className="">
              <div className="flex justify-between">
                <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t('admin58')}</h1>
                <button type="button" onClick={switchCategoryModal} className="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mt-4 mb-8">{t('admin62')}</button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t('admin59')}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t('admin60')}
                      </th>
                    </tr>
                  </thead>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center">
                        <h1 className='text-[60px] mt-12'>:)</h1>
                        <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                      </td>
                    </tr>
                  ) : (
                    <tbody>
                      {categories.map((category) => (
                        <tr className="bg-white" key={category.id}>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {currentCount++}
                          </td>
                          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {category.name}
                          </td>
                          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteCategory(category.id)}>{t('admin61')}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>

            </section>
          </div>
        </main>
      </div>
    </>
  )
}

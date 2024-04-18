import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'
import CreateAdminModal from './modals/CreateAdminModal'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Admins {
  id?: string
  name: string
  email: string
  phone_number: string
}

export default function Admins({ admins, name, email }: PageProps<{ admins: Admins[], name: string, email: string }>) {
  const appName = "Admins"
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const switchAdminModal = () => {
    setIsAdminModalOpen(!isAdminModalOpen)
  }

  const deleteAdmin = async (id: string | undefined) => {
    Inertia.delete(`/super-admin/admins/${id}`)
    toast.success('Data Successfully Deleted!')
  }

  return (
    <>
      {isAdminModalOpen && <CreateAdminModal closeModal={switchAdminModal} />}
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
                <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t('super_admin1')}</h1>
                <button type="button" onClick={switchAdminModal} className="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mt-4 mb-8">{t('super_admin6')}</button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('super_admin2')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('super_admin3')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('super_admin4')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('super_admin5')}
                      </th>
                    </tr>
                  </thead>
                  {admins.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center">
                        <h1 className='text-[60px] mt-12'>:)</h1>
                        <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                      </td>
                    </tr>
                  ) : (
                    <tbody>
                      {admins.map((admin, index) => (
                        <tr key={admin.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{admin.name}</td>
                          <td className="px-6 py-4 text-center">{admin.email}</td>
                          <td className="px-6 py-4 text-center">{admin.phone_number}</td>
                          <td className="px-6 py-4 text-center">
                            <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteAdmin(admin.id)}>{t('super_admin7')}</button>
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

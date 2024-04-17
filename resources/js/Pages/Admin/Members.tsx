import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Inertia } from '@inertiajs/inertia'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Member {
  id?: string
  name: string
  email: string
  address: string
  phone_number: string
  birth_date: string
}

export default function Members({ members }: PageProps<{ members: Member[] }>) {
  const appName = "Members"
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const deleteMember = async (id: string | undefined) => {
    Inertia.delete(`/admin/member/${id}`)
    toast.success('Data Successfully Deleted!')
  }

  return (
    <>
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
            <Navbar />
            <section className="">
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t('admin24')}</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin25')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin26')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin27')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin28')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin29')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin30')}
                      </th>
                    </tr>
                  </thead>
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center">
                        <h1 className='text-[60px] mt-12'>:)</h1>
                        <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                      </td>
                    </tr>
                  ) : (
                    <tbody>
                      {members.map((member, index) => (
                        <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{member.name}</td>
                          <td className="px-6 py-4 text-center">{member.email}</td>
                          <td className="px-6 py-4 text-center">{member.address}</td>
                          <td className="px-6 py-4 text-center">{member.phone_number}</td>
                          <td className="px-6 py-4 text-center">{member.birth_date}</td>
                          <td className="px-6 py-4 text-center">
                            <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteMember(member.id)}>{t('admin31')}</button>
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

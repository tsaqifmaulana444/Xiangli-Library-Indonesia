import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'
import { Inertia } from '@inertiajs/inertia'

interface DashboardProps {
  name: string
  email: string
  alerts: Alerts[]
}

interface Alerts {
  id?: string
  message: string
  admin: string
  user_id: string
  created_at: Date
  status: boolean
}

export default function Dashboard({ alerts, name, email }: DashboardProps) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()
  const appName = "Dashboard"

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`
  }

  const dismissAlert = async (id: string | undefined) => {
    Inertia.put(`/dismiss-alert/${id}`, {
      id: id,
    })
    toast.success("Don't Forget To Return It Ya!")
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
            <Navbar name={name} email={email} />
            <h1 className='mt-4 mb-8 font-bold text-[22px]'>Alert Of Violation</h1>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center">
                  <h1 className='text-[60px] mt-12'>:)</h1>
                  <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                </td>
              </tr>
            ) : (
              <div>
                {alerts.filter(data => data.status === true).length === 0 ? (
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <h1 className='text-[60px] mt-12'>:)</h1>
                    <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                  </td>
                ) : (
                  alerts.filter(data => data.status === true).map((data) => (
                    <div key={data.id} className='shadow-lg rounded-md p-4'>
                      <p className='font-bold text-[19px]'>From: {data.admin}</p>
                      <p>{data.message}</p>
                      <p>{data.status}</p>
                      <p>{formatDate(data.created_at)}</p>
                      <button onClick={() => dismissAlert(data.id)} className='bg-red-500 text-white rounded-md px-3 py-1 mt-2'>
                        Dismiss
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

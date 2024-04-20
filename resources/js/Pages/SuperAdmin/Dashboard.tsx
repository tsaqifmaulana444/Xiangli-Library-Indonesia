import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Chart } from "react-google-charts"
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface DashboardProps {
  members: number
  actives: number
  books: number
  categories: number
  book_id: string
  amount: number
  name:string
  email:string
}

export default function Dashboard({ members, actives, books, categories, book_id, amount, name, email }: DashboardProps) {
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()
  const appName = "Dashboard"
  const data = [
    [
      "Element",
      "Borrow",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    [book_id, amount, "color: #b87333", null],
  ]
  
  
  const options = {
    title: "",
    height: 250,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  }

  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar name={name} email={email} />
            <section className="flex justify-between mt-12">
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>{t('admin1')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{members}</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>{t('admin2')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{books}</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>{t('admin3')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{actives}</h3>
              </div>
              <div className="shadow-md rounded-md w-[23%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>{t('admin4')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{categories}</h3>
              </div>
            </section>
            <section className="flex justify-between mt-6">
              <div className="shadow-md rounded-md w-[48.6%] py-2 px-5">
                <p className='text-[14px]'>{t('admin5')}</p>
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="250px"
                  data={data}
                  options={options}
                />
              </div>
              <div className="shadow-md rounded-md w-[48.6%] h-[200px] py-2 px-5">
                <p className='text-[14px]'>{t('admin6')}</p>
                <div className="flex justify-between mt-8">
                  <p className="font-bold">{t('admin7')}</p>
                  <a href="/super-admin/book_export" className='hover:underline'>{t('admin9')}</a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

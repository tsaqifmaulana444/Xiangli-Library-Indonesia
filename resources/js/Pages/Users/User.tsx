import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useLaravelReactI18n } from 'laravel-react-i18n'

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
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()
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
                <p className='text-[14px]'>{t('user_dashboard1')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{actives}</h3>
              </div>
              <div className="shadow-md rounded-md w-[31%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>{t('user_dashboard2')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{books}</h3>
              </div>
              <div className="shadow-md rounded-md w-[31%] h-[100px] py-2 px-5">
                <p className='text-[14px]'>{t('user_dashboard3')}</p>
                <h3 className='mt-2 text-[25px] font-bold'>{categories}</h3>
              </div>
            </section>
            <section className="flex justify-evenly mt-6">
              <div className="shadow-md rounded-md w-[41%] py-2 px-5">
                <p className='text-[14px]'>{t('user_dashboard4')}</p>
                {recommended2.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center">
                      <h1 className='text-[60px] mt-12'>:)</h1>
                      <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                    </td>
                  </tr>
                ) : (
                  recommended2.map((recommend, index) => (
                    <Link href="/list-book">
                      <div key={index} className='mt-2'>
                        <img src={`/storage/book/${recommend.image.substring(recommend.image.lastIndexOf('/'))}`} alt="image" className='w-full h-[210px]' />
                        <p className='font-bold text-lg mt-2'>{recommend.name}</p>
                        <p className='opacity-70 text-xs'>{recommend.author}</p>
                        <p>{`${recommend.description.substring(0, 100)}...`}</p>
                      </div>
                    </Link>
                  )))}
              </div>
              <div className="shadow-md rounded-md w-[41%] py-2 px-5">
                <p className='text-[14px]'>{t('user_dashboard5')}</p>
                {recommended2.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center">
                      <h1 className='text-[60px] mt-12'>:)</h1>
                      <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                    </td>
                  </tr>
                ) : (
                  recommended.map((recommend, index) => (
                    <Link href="/list-book">
                      <div key={index} className='mt-2'>
                        <img src={`/storage/book/${recommend.image.substring(recommend.image.lastIndexOf('/'))}`} alt="image" className='w-full h-[210px]' />
                        <p className='font-bold text-lg mt-2'>{recommend.name}</p>
                        <p className='opacity-70 text-xs'>{recommend.author}</p>
                        <p>{`${recommend.description.substring(0, 120)}...`}</p>
                      </div>
                    </Link>
                  )))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

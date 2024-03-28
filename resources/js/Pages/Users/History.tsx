import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'
import AmendBookModal from './modals/AmendBookModal'
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface Borrow {
  book: any
  id?: string
  user_id: string
  book_id: string
  amount: string
  borrow_in: string
  borrow_out: string
  status: string
  pay_fine: boolean
}

export default function History({ borrows }: PageProps<{ borrows: Borrow[] }>) {
  const appName = "History"
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const deleteBorrower = async (id: string | undefined) => {
    Inertia.delete(`/borrow-book/${id}`)
  }

  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false)
  const [selectedBorrow, setSelectedBorrow] = useState<Borrow | null>(null)

  const openAmendModal = (borrow: Borrow) => {
    setSelectedBorrow(borrow)
    setIsAmendModalOpen(true)
  }

  const closeAmendModal = () => {
    setSelectedBorrow(null)
    setIsAmendModalOpen(false)
  }

  const doneBorrow = async (id: string | undefined) => {
    Inertia.put(`/done-borrow-book/${id}`, {
      status: "Done",
    })
  }

  const payFine = async (id: string | undefined) => {
    Inertia.put(`/pay-fine/${id}`, {
      pay_fine: false,
    })
  }

  return (
    <>
      {isAmendModalOpen && selectedBorrow && <AmendBookModal closeModal={closeAmendModal} borrow={selectedBorrow} />}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar />
            <section className="">
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t('user_book14')}</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book2')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book7')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book8')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book9')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book15')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book16')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('user_book17')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrows.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center">
                          <h1 className='text-[60px] mt-12'>:)</h1>
                          <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                        </td>
                      </tr>
                    ) : (
                      borrows.map((borrow, index) => (
                        <tr key={borrow.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 text-center">{borrow.book.name}</td>
                          <td className="px-6 py-4 text-center">{borrow.amount}</td>
                          <td className="px-6 py-4 text-center">{borrow.borrow_in}</td>
                          <td className="px-6 py-4 text-center">{borrow.borrow_out}</td>
                          <td className="px-6 py-4 text-center">{borrow.status}</td>
                          <td className="px-6 py-4 text-center">
                            {borrow.status === 'Waiting' ? (
                              <>
                                <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteBorrower(borrow.id)}>{t('user_book10')}</button>
                                <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={() => openAmendModal(borrow)}>{t('user_book18')}</button>
                              </>
                            ) : borrow.status === 'Done' ? (
                              <>
                                <p>-</p>
                              </>
                            ) : (
                              <button type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onClick={() => doneBorrow(borrow.id)}>{t('user_book19')}</button>
                            )}
                          </td>
                          {borrow.pay_fine == true ? (
                            <td className="px-6 py-4 text-center">
                              <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300   font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onClick={() => payFine(borrow.id)}>{t('user_book20')}</button>
                            </td>
                          ) : (
                            <td className="px-6 py-4 text-center">
                              -
                            </td>
                          )}
                        </tr>
                      ))
                    )}
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

import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'
import AmendBookModal from './modals/AmendBookModal'
import BookRatingModal from './modals/BookRatingModal'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

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

export default function History({ borrows, name, email }: PageProps<{ borrows: Borrow[], name: string, email: string }>) {
  const appName = "History"
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const deleteBorrower = async (id: string | undefined) => {
    Inertia.delete(`/borrow-book/${id}`)
    toast.success('Success!')
  }

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState<Borrow | null>(null)

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
  
  const openRatingModal = (borrow: Borrow) => {
    setSelectedRating(borrow)
    setIsRatingModalOpen(true)
  }

  const closeRatingModal = () => {
    setSelectedRating(null)
    setIsRatingModalOpen(false)
  }

  const doneBorrow = async (id: string | undefined) => {
    Inertia.put(`/done-borrow-book/${id}`, {
      status: "Done",
    })
    toast.success('Success!')
  }

  const payFine = async (id: string | undefined) => {
    Inertia.put(`/pay-fine/${id}`, {
      pay_fine: false,
    })
    toast.success('Success!')
  }

  return (
    <>
      {isAmendModalOpen && selectedBorrow && <AmendBookModal closeModal={closeAmendModal} borrow={selectedBorrow} />}
      {isRatingModalOpen && selectedRating && <BookRatingModal closeModal={closeRatingModal} borrow={selectedRating} />}
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
                      <th scope="col" className="px-6 py-3 text-center">
                        Rate The Book
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
                          <td className="px-6 py-4 text-center">{borrow.book_id}</td>
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
                          <td className="px-6 py-4 text-center">
                            {borrow.pay_fine == true ? (
                              <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300   font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onClick={() => payFine(borrow.id)}>{t('user_book20')}</button>
                            ) : (
                              <>
                                -
                              </>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {borrow.status == 'Done' ? (
                              <div className="rounded-full bg-yellow-400 w-10 h-10 flex items-center justify-center mx-auto" onClick={() => openRatingModal(borrow)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5" fill="#ffffff"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                              </div>
                            ) : (
                              <>
                                Finish Reading First
                              </>
                            )}
                          </td>
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

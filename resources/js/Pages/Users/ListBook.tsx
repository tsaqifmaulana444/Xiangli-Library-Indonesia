import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { FormEvent, useState } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import BorrowBookModal from './modals/BorrowBookModal'
import { Inertia } from '@inertiajs/inertia'
import toast, { Toaster } from 'react-hot-toast'

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

export default function Dashboard({ books, name, email }: PageProps<{ books: Book[], name: string, email: string }>) {
  const appName = "List Book"
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const openBorrowModal = (book: Book) => {
    setSelectedBook(book)
    setIsBorrowModalOpen(true)
  }

  const closeBorrowModal = () => {
    setSelectedBook(null)
    setIsBorrowModalOpen(false)
  }

  const handleBookmark = async (id: string | undefined) => {
    if (id) {
      Inertia.post(`/add-bookmark`, {
        user_id: 0,
        book_id: id
      })
      toast.success('Added To Bookmark!')
    }
  }  

  return (
    <>
      {isBorrowModalOpen && selectedBook && <BorrowBookModal closeModal={closeBorrowModal} book={selectedBook} />}
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
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t('user_book')}</h1>
              {books.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <h1 className='text-[60px] mt-12'>:)</h1>
                    <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                  </td>
                </tr>
              ) : (
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {books.map((book) => (
                    <div className="shadow-md rounded-md w-[95%] p-5" key={book.id}>
                      <div onClick={() => openBorrowModal(book)}>
                        <img src={`/storage/book/${book.image.substring(book.image.lastIndexOf('/'))}`} alt="" className='w-full h-[160px] rounded-sm' />
                        <h3 className='text-[18px] font-bold mt-2 truncate'>{book.name}</h3>
                        <p className='text-[11px] my-1'>{book.date}</p>
                        <p className='text-[13px] mb-2 truncate'>{`${book.description.substring(0, 120)}...`}</p>
                      </div>
                      <div className='flex justify-between'>
                        <>
                          {/* {book.categories.map((category, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{typeof category === 'string' ? category : category.name}</span>
                          ))} */}
                        </>
                        <div onClick={() => handleBookmark(book.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4" fill="#141414"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" /></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

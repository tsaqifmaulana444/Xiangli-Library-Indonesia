import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import BorrowBookModal from './modals/BorrowBookModal'

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

  return (
    <>
      {isBorrowModalOpen && selectedBook && <BorrowBookModal closeModal={closeBorrowModal} book={selectedBook} />}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
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
                <div className="grid grid-cols-3 gap-4">
                  {books.map((book) => (
                    <div onClick={() => openBorrowModal(book)}>
                      <div className="shadow-md rounded-md w-[95%] p-5" key={book.id}>
                        <a href=""></a>
                        <img src={`/storage/book/${book.image.substring(book.image.lastIndexOf('/'))}`} alt="" className='w-full h-[160px] rounded-sm' />
                        <h3 className='text-[18px] font-bold mt-2 truncate'>{book.name}</h3>
                        <p className='text-[11px] my-1'>{book.date}</p>
                        <p className='text-[13px] mb-2 truncate'>{`${book.description.substring(0, 120)}...`}</p>
                        <>
                          {book.categories.map((category, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{typeof category === 'string' ? category : category.name}</span>
                          ))}
                        </>
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

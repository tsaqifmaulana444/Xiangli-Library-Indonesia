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
  rating: string
  ratings_count: string
  categories: string[]
}

interface Bookmark {
  id?: string
  user_id: string
  book_id: string
}

export default function Dashboard({ books, name, email, bookmarks, user_id }: PageProps<{ books: Book[], name: string, email: string, bookmarks: Bookmark[], user_id: string }>) {
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

  const isBookmarked = (bookId: string | undefined) => {
    return bookmarks.some((bookmark) => bookmark.book_id === bookId)
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

  const deleteBookmark = async (id: string | undefined) => {
    if (id) {
      Inertia.delete(`/delete-bookmark/${id}`, {
        data: { user_id: 0, book_id: id },
      })
      toast.success('Bookmark Deleted!')
    }
  }

  return (
    <>
      {isBorrowModalOpen && selectedBook && <BorrowBookModal closeModal={closeBorrowModal} book={selectedBook} user_id={user_id}/>}
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
                        <img src={`/storage/book/${book.image.substring(book.image.lastIndexOf('/'))}`} alt="" className='w-full h-[210px] rounded-sm' />
                        <h3 className='text-[18px] font-bold mt-2 truncate'>{book.name}</h3>
                        <p className='text-[11px] my-1'>{book.author}</p>
                        <p className='text-[13px] mb-2 truncate'>{`${book.description.substring(0, 120)}`}</p>
                        <div className='text-[13px] mb-4 mt-3 flex justify-between'>
                          <div className='flex'>
                            {parseFloat(book.rating) >= 2.5 ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5" fill="#e5de00" viewBox="0 0 576 512">
                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5" fill="#e5de00">
                                <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                              </svg>
                            )}
                            {book.rating !== null ? (
                              <p className='ml-2'>{book.rating}</p>
                            ):(
                              <p className='ml-2'>-</p>
                            )}
                          </div>
                          <p>
                            {book.ratings_count} {t("add12")}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <>
                          {book.categories.map((category, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{typeof category === 'string' ? category : category.name}</span>
                          ))}
                        </>
                        <div className='flex'>
                          {isBookmarked(book.id) ? (
                            <div onClick={() => deleteBookmark(book.id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4" fill="#141414">
                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                              </svg>
                            </div>
                          ) : (
                            <div onClick={() => handleBookmark(book.id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4" fill="#141414">
                                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                              </svg>
                            </div>
                          )}
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

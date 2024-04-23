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

interface Bookmark {
  id?: string
  user_id: string
  book_id: string
}

export default function Bookmark({ books, name, email, bookmarks, user_id }: PageProps<{ books: Book[], user_id: string, name: string, email: string, bookmarks: Bookmark[] }>) {
  const appName = "List Book";
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n();

  const openBorrowModal = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const closeBorrowModal = () => {
    setSelectedBook(null);
    setIsBorrowModalOpen(false);
  };

  const isBookmarked = (bookId: string | undefined) => {
    return bookmarks.some((bookmark) => bookmark.book_id === bookId);
  };

  const deleteBookmark = async (id: string | undefined) => {
    if (id) {
      Inertia.delete(`/delete-bookmark2/${id}`, {
        data: { user_id: 0, book_id: id },
      })
      toast.success(t("add7"))
    }
  } 

  // Filter daftar buku berdasarkan keberadaan bookmarknya
  const bookmarkedBooks = books.filter((book) => isBookmarked(book.id));

  return (
    <>
      {isBorrowModalOpen && selectedBook && <BorrowBookModal closeModal={closeBorrowModal} book={selectedBook} user_id={user_id} />}
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
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t("add8")}</h1>
              {bookmarkedBooks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <h1 className='text-[60px] mt-12'>:)</h1>
                    <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                  </td>
                </tr>
              ) : (
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {bookmarkedBooks.map((book) => (
                    <div className="shadow-md rounded-md w-[95%] p-5" key={book.id}>
                      <div onClick={() => openBorrowModal(book)}>
                        <img src={`/storage/book/${book.image.substring(book.image.lastIndexOf('/'))}`} alt="" className='w-full h-[160px] rounded-sm' />
                        <h3 className='text-[18px] font-bold mt-2 truncate'>{book.name}</h3>
                        <p className='text-[11px] my-1'>{book.date}</p>
                        <p className='text-[13px] mb-2 truncate'>{`${book.description.substring(0, 120)}...`}</p>
                      </div>
                      <div className='flex justify-between'>
                        <>
                          {book.categories.map((category, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{typeof category === 'string' ? category : category.name}</span>
                          ))}
                        </>
                        <div className='flex'>
                          <div onClick={() => deleteBookmark(book.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4" fill="#141414">
                              <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                            </svg>
                          </div>
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
  );
}


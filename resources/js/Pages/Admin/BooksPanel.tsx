import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CreateBookModal from './modals/CreateBookModal'
import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import EditBookModal from './modals/EditBookModal'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Category {
  id?: string
  name: string
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

export default function BooksPanel({ categories, books, name, email }: PageProps<{ categories: Category[], books: Book[], name: string, email: string }>) {
  const appName = "Books Panel"
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  let [currentCount, setCurrentCount] = useState(1)
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const switchBookModal = () => {
    setIsBookModalOpen(!isBookModalOpen)
  }

  const openEditModal = (book: Book) => {
    setSelectedBook(book)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setSelectedBook(null)
    setIsEditModalOpen(false)
  }

  const deleteBook = async (id: string | undefined) => {
    Inertia.delete(`/admin/books-panel/${id}`)
    toast.success('Data Successfully Deleted!')
  }

  return (
    <>
      {isBookModalOpen && <CreateBookModal closeModal={switchBookModal} categories={categories} />}
      {isEditModalOpen && selectedBook && <EditBookModal closeModal={closeEditModal} categories={categories} book={selectedBook} />}
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
              <div className="flex justify-between">
                <h1 className='mt-4 mb-8 font-bold text-[22px]'>{t('admin32')}</h1>
                <button type="button" onClick={switchBookModal} className="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mt-4 mb-8">{t('admin41')}</button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin33')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin34')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin35')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin36')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin37')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin38')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin39')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        {t('admin40')}
                      </th>
                    </tr>
                  </thead>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center">
                        <h1 className='text-[60px] mt-12'>:)</h1>
                        <p className='text-[28px] mt-12'>{t('empty_table')}</p>
                      </td>
                    </tr>
                  ) : (
                    <tbody>
                      {books.map((book, index) => (
                        <tr key={book.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium t  ext-gray-900 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{`${book.name.substring(0, 15)}...`}</td>
                          <td className="px-6 py-4 text-center">{book.date}</td>
                          <td className="px-6 py-4 text-center">{book.author}</td>
                          <td className="px-6 py-4 text-center">{book.stock}</td>
                          <td className="px-6 py-4 text-center">{`${book.description.substring(0, 30)}...`}</td>
                          <td className="px-6 py-4 text-center">
                            <img src={`/storage/book/${book.image.substring(book.image.lastIndexOf('/'))}`} alt="image" className='w-[70px]' />
                          </td>
                          <td className="px-6 py-4 text-center">
                            {book.categories.map((category, index) => (
                              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{typeof category === 'string' ? category : category.name}</span>
                            ))}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteBook(book.id)}>{t('admin42')}</button>
                            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={() => openEditModal(book)}>{t('admin43')}</button>
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

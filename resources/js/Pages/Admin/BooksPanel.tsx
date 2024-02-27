import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CreateBookModal from './modals/CreateBookModal'
import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import EditBookModal from './modals/EditBookModal'

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

export default function BooksPanel({ categories, books }: PageProps<{ categories: Category[], books: Book[] }>) {
  const appName = "Books Panel"
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  let [currentCount, setCurrentCount] = useState(1)

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
  }

  return (
    <>
      {isBookModalOpen && <CreateBookModal closeModal={switchBookModal} categories={categories} />}
      {isEditModalOpen && selectedBook && <EditBookModal closeModal={closeEditModal} categories={categories} book={selectedBook} />}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar />
            <section className="">
              <div className="flex justify-between">
                <h1 className='mt-4 mb-8 font-bold text-[22px]'>Book Panel</h1>
                <button type="button" onClick={switchBookModal} className="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mt-4 mb-8">Add Book</button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Book Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Date Published
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Categories
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={book.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{book.name}</td>
                        <td className="px-6 py-4 text-center">{book.date}</td>
                        <td className="px-6 py-4 text-center">{book.author}</td>
                        <td className="px-6 py-4 text-center">{book.stock}</td>
                        <td className="px-6 py-4 text-center">{book.description}</td>
                        <td className="px-6 py-4 text-center">{book.image}</td>
                        <td className="px-6 py-4 text-center">
                          {book.categories}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteBook(book.id)}>Delete</button>
                          <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={() => openEditModal(book)}>Edit</button>
                        </td>
                      </tr>
                    ))}
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

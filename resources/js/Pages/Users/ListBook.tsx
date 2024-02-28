import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useState } from 'react'
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

export default function Dashboard({ books }: PageProps<{ books: Book[] }>) {
  const appName = "List Book"
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)


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
            <Navbar />
            <section className="">
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>List Of Our Available Book</h1>
              <div className="grid grid-cols-3 gap-4">
                {books.map((book) => (
                  <div onClick={() => openBorrowModal(book)}>
                    <div className="shadow-md rounded-md w-[95%] p-5" key={book.id}>
                      <a href=""></a>
                      <img src={`/storage/book/${book.image.substring(book.image.lastIndexOf('/'))}`} alt="" className='w-full h-[160px] rounded-sm' />
                      <h3 className='text-[18px] font-bold mt-2'>{book.name}</h3>
                      <p className='text-[11px] my-1'>{book.date}</p>
                      <p className='text-[13px]'>{book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

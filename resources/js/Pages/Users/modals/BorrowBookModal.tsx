import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Book {
    id?: string
    name: string
    date: string
    author: string
    stock: string
    description: string
    categories: string[]
}

interface BorrowBookModalProps {
    closeModal: () => void
    book: Book
    user_id: string
}

export default function BorrowBookModal({ closeModal, book, user_id }: BorrowBookModalProps) {
    const [name, setName] = useState(book.name || '')
    const [date, setDate] = useState(book.date || '')
    const [author, setAuthor] = useState(book.author || '')
    const [stock, setStock] = useState(book.stock || '')
    const [description, setDescription] = useState(book.description || '')
    const [borrowQty, setBorrowQty] = useState('')
    const [borrowIn, setBorrowIn] = useState('')
    const [borrowOut, setBorrowOut] = useState('')
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!book.id) {
            console.error('Book ID is undefined')
            return
        }

        Inertia.post('/borrow-book', {
            user_id: user_id,
            book_id: book.id,
            amount: borrowQty,
            borrow_in: borrowIn,
            borrow_out: borrowOut,
        })
        toast.success('Success!')
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h1 className='font-bold text-xl mb-5'>{t('user_book1')}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book2')}</h3>
                                <p className='text-[13px]'>{name}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book3')}</h3>
                                <p className='text-[13px]'>{date}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book4')}</h3>
                                <p className='text-[13px]'>{author}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book5')}</h3>
                                <p className='text-[13px]'>{description}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book6')}</h3>
                                <p className='text-[13px]'>{stock}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>{t('user_book7')}</h3>
                                <input type='number' id='stock' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantity" required onChange={(e) => setBorrowQty(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>{t('user_book8')}</h3>
                                <input type='date' id='stock' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Borrow duration" required onChange={(e) => setBorrowIn(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>{t('user_book9')}</h3>
                                <input type='date' id='stock' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Borrow duration" required onChange={(e) => setBorrowOut(e.target.value)} />
                            </div>
                            <div className='flex'>
                                <button type='button' onClick={closeModal} className='text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>{t('user_book10')}</button>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3'>{t('user_book11')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

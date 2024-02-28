import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'

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
}

export default function BorrowBookModal({ closeModal, book }: BorrowBookModalProps) {
    const [name, setName] = useState(book.name || '')
    const [date, setDate] = useState(book.date || '')
    const [author, setAuthor] = useState(book.author || '')
    const [stock, setStock] = useState(book.stock || '')
    const [description, setDescription] = useState(book.description || '')
    const [image, setImage] = useState<File | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(book.categories || [])

    return (
        <>
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h1 className='font-bold text-xl mb-5'>Book Detail</h1>
                        <form action="">
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>Book Name</h3>
                                <p className='text-[13px]'>{name}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>Date Release</h3>
                                <p className='text-[13px]'>{date}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>Author</h3>
                                <p className='text-[13px]'>{author}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>Description</h3>
                                <p className='text-[13px]'>{description}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>Stock</h3>
                                <p className='text-[13px]'>{stock}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>Borrow Quantity</h3>
                                <input type='number' id='stock'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantity" required />
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>Borrow Duration <span className='font-normal text-[11px]'>* in days</span></h3>
                                <input type='number' id='stock'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Borrow duration" required />
                            </div>
                            <div className='flex'>
                                <button type='button' onClick={closeModal} className='text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Cancel</button>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3'>Borrow</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
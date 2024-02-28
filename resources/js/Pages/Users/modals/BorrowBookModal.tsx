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

interface EditBookModalProps {
    closeModal: () => void
    // book: Book
}

export default function EditBookModal({ closeModal }: EditBookModalProps) {

    return (
        <>
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h1 className='font-bold text-xl mb-5'>Book Detail</h1>
                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'

interface modalProps {
    closeModal: () => void
}

export default function BookModal({ closeModal }: modalProps) {
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [author, setAuthor] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const storeBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Inertia.post('/admin/categories', {
            name: name
        })
    }

    return (
        <>
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h1 className='font-bold text-[20px]'>Create New Book</h1>
                        <form className="mx-auto mt-5" onSubmit={storeBook}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input autoComplete='off' type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Book name" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Year Published</label>
                                <input autoComplete='off' type="date" id="date" name="year" value={year} onChange={(e) => setYear(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Year published" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Author</label>
                                <input autoComplete='off' type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Author Name" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                                <input autoComplete='off' type="text" id="stock" name="name" value={stock} onChange={(e) => setStock(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Author Name" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 h-28 focus:ring-black focus:border-black" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the book in the best way..."></textarea>

                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <div className="flex items-center mb-4 mx-1">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">Default checkbox</label>
                                </div>
                            </div>
                            <div className="flex">
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={closeModal}>Close</button>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}   
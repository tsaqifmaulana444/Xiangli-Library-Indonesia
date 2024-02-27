import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'

interface Category {
    id?: string
    name: string
}

interface modalProps {
    closeModal: () => void
    categories: Category[]
}

export default function BookModal({ closeModal, categories }: modalProps) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [author, setAuthor] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0])
        }
    }

    const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
        const isChecked = e.target.checked
    
        if (isChecked) {
            setSelectedCategories([...selectedCategories, categoryId])
        } else {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
        }
    }    

    const storeBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const categoriesJSON = JSON.stringify(selectedCategories)
    
        Inertia.post('/admin/books-panel', {
            name: name,
            date: date,
            author: author,
            stock: stock,
            description: description,
            categories: categoriesJSON,
            image: image,
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
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date Published</label>
                                <input autoComplete='off' type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Year published" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Author</label>
                                <input autoComplete='off' type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Author Name" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                                <input autoComplete='off' type="number" id="stock" name="name" value={stock} onChange={(e) => setStock(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Stock" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 h-28 focus:ring-black focus:border-black" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the book in the best way..."></textarea>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                                <input type="file" id="image" name="image" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center mb-4 mx-1">
                                        <input
                                            id={category.id}
                                            type="checkbox"
                                            value={category.name}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            onChange={(e) => handleCategoryCheckboxChange(e, category.name || '')}
                                        />
                                        <label htmlFor={category.id} className="ms-2 text-sm font-medium text-gray-900">{category.name}</label>
                                    </div>
                                ))}
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

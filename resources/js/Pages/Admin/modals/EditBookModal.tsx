import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'

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
    categories: string[]
}

interface EditBookModalProps {
    closeModal: () => void
    categories: Category[]
    book: Book
}

export default function EditBookModal({ closeModal, categories, book }: EditBookModalProps) {
    const [name, setName] = useState(book.name || '')
    const [date, setDate] = useState(book.date || '')
    const [author, setAuthor] = useState(book.author || '')
    const [stock, setStock] = useState(book.stock || '')
    const [description, setDescription] = useState(book.description || '')
    const [selectedCategories, setSelectedCategories] = useState<string[]>(book.categories || [])

    const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
        const isChecked = e.target.checked
    
        if (isChecked) {
            setSelectedCategories([...selectedCategories, categoryId])
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
        }
    }    

    const updateBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const categoriesJSON = JSON.stringify(selectedCategories)

        Inertia.put(`/admin/books-panel/${book.id}`, {
            name: name,
            date: date,
            author: author,
            stock: stock,
            description: description,
            categories: categoriesJSON
        })
    }
    
    return (
        <>
            <div className='fixed w-full h-full bg-gray-700 bg-opacity-50 z-50 flex justify-center items-center'>
                <div className='bg-white w-96 rounded-lg z-50 px-6 py-7'>
                    <h1 className='font-bold text-xl mb-5'>Edit Book</h1>
                    <form onSubmit={updateBook}>
                        <div className='mb-4'>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} className='mt-1 p-2 w-full border rounded-md' required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='date' className='block text-sm font-medium text-gray-700'>Date Published</label>
                            <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} className='mt-1 p-2 w-full border rounded-md' required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='author' className='block text-sm font-medium text-gray-700'>Author</label>
                            <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} className='mt-1 p-2 w-full border rounded-md' required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='stock' className='block text-sm font-medium text-gray-700'>Stock</label>
                            <input type='number' id='stock' value={stock} onChange={(e) => setStock(e.target.value)} className='mt-1 p-2 w-full border rounded-md' required />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                            <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1 p-2 w-full border rounded-md' required />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Categories</label>
                            {categories.map(category => (
                                <div key={category.id} className='flex items-center'>
                                    <input type='checkbox' checked={selectedCategories.includes(category.id || '')} onChange={(e) => handleCategoryCheckboxChange(e, category.id || '')} className='mr-2' />
                                    <span>{category.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between'>
                            <button type='button' onClick={closeModal} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Cancel</button>
                            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

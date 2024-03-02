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
    const [image, setImage] = useState<File | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(book.categories || [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0])
        }
    }

    const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
        const isChecked = e.target.checked;
    
        if (isChecked) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryId));
        }
    }    
    
    const updateBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Name:", name);
        console.log("Date:", date);
        console.log("Author:", author);
        console.log("Stock:", stock);
        console.log("Description:", description);
        console.log("Image:", image);
        console.log("Selected Categories:", selectedCategories);

        const formData = new FormData()
        formData.append('name', name)
        formData.append('date', date)
        formData.append('author', author)
        formData.append('stock', stock)
        formData.append('description', description)
        formData.append('image', image as Blob)

        selectedCategories.forEach(categoryId => {
            formData.append('categories[]', categoryId)
        })
        
        Inertia.put(`/admin/books-panel/${book.id}`, formData)
    }

    return (
        <>
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h1 className='font-bold text-xl mb-5'>Edit Book</h1>
                        <form onSubmit={updateBook}>
                            <div className='mb-4'>
                                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                                <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Book name" required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='date' className='block text-sm font-medium text-gray-700'>Date Published</label>
                                <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Year published" required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='author' className='block text-sm font-medium text-gray-700'>Author</label>
                                <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Author Name" required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='stock' className='block text-sm font-medium text-gray-700'>Stock</label>
                                <input type='number' id='stock' value={stock} onChange={(e) => setStock(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Stock" required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                                <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 h-28 focus:ring-black focus:border-black" required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='image' className='block text-sm font-medium text-gray-700'>Image</label>
                                <input type='file' id='image' onChange={handleImageChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Categories</label>
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center mb-4 mx-1">
                                        <input
                                            id={category.id}
                                            type="checkbox"
                                            value={category.name}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            onChange={(e) => handleCategoryCheckboxChange(e, category.id || '')}
                                        />
                                        <label htmlFor={category.id} className="ms-2 text-sm font-medium text-gray-900">{category.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className='flex'>
                                <button type='button' onClick={closeModal} className='text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Cancel</button>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

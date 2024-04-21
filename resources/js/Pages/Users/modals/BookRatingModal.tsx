import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Borrow {
    book: any
    id?: string
    user_id: string
    book_id: string
    amount: string
    borrow_in: string
    borrow_out: string
    status: string
    pay_fine: boolean
  }
  
interface modalProps {
    closeModal: () => void
    borrow: Borrow
}

export default function BookRatingModal({ borrow, closeModal }: modalProps) {
    const [star, setStar] = useState('')
    const [rate, setRate] = useState('')
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    const storeRating = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Inertia.post('/add-rating', {
            book_id: borrow.book_id,
            user_id: borrow.user_id,
            star: star,
            description: rate,
            borrow_id: borrow.id
        })
        toast.success('Rating Successfully Added!')
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7">
                        <h1 className='font-bold text-[20px]'>Rate The Book</h1>
                        <form className="mx-auto mt-5" onSubmit={storeRating}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Star</label>
                                <select name="" id="" className='rounded-md border border-gray-300 bg-gray-50' value={star} onChange={(e) => setStar(e.target.value)}>
                                    <option value="">Please Enter The Rating</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea id="message" className="block p-2.5 w-full h-28 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a comment..." onChange={(e) => setRate(e.target.value)} required></textarea>
                            </div>
                            <div className="flex">
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={closeModal}>{t('admin54')}</button>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3">{t('admin55')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}   
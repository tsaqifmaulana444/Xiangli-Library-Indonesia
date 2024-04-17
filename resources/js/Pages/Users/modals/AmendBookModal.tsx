import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface Borrow {
    id?: string
    user_id: string
    book_id: string
    amount: string
    borrow_in: string
    borrow_out: string
    status: string
}

interface AmendBookModalProps {
    closeModal: () => void
    borrow: Borrow
}

export default function AmendBookModal({ closeModal, borrow }: AmendBookModalProps) {
    const [id, setId] = useState(borrow.id || '')
    const [userId, setUserId] = useState(borrow.user_id || '')
    const [bookId, setBookId] = useState(borrow.book_id || '')
    const [amount, setAmount] = useState(borrow.amount || '')
    const [borrowIn, setBorrowIn] = useState(borrow.borrow_in || '')
    const [borrowOut, setBorrowOut] = useState(borrow.borrow_out || '')
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    const updateBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Inertia.put(`/borrow-book/${id}`, {
            amount: amount,
            borrow_in: borrowIn,
            borrow_out: borrowOut
        })
        toast.success('Data Successfully Updated!')
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
                        <form onSubmit={updateBook}>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book12')}</h3>
                                <p className='text-[13px]'>{userId}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px]'>{t('user_book2')}</h3>
                                <p className='text-[13px]'>{bookId}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>{t('user_book7')}</h3>
                                <input type='number' id='stock' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quantity" value={amount} required onChange={(e) => setAmount(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>{t('user_book8')}</h3>
                                <input type='date' id='stock' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Borrow duration" value={borrowIn} required onChange={(e) => setBorrowIn(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <h3 className='font-bold text-[16px] mb-2'>{t('user_book9')}</h3>
                                <input type='date' id='stock' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Borrow duration" value={borrowOut} required onChange={(e) => setBorrowOut(e.target.value)} />
                            </div>
                            <div className='flex'>
                                <button type='button' onClick={closeModal} className='text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>{t('user_book10')}</button>
                                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3'>{t('user_book13')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

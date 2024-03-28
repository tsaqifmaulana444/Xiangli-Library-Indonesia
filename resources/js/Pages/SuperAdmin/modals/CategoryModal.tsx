import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface modalProps {
    closeModal : () => void
}

export default function CategoryModal({closeModal}: modalProps) {
    const [name, setName] = useState('')
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    const storeCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        Inertia.post('/super-admin/categories', {
            name: name
        })
    }

    return (
        <>
            <div className='fixed w-[100%] h-[100vh] bg-[#1414147c] z-[99] flex justify-center items-center'>
                <div className='bg-white w-[50%] rounded-lg z-[999] px-6 flex items-center'>
                    <div className="w-full py-7">
                        <h1 className='font-bold text-[20px]'>{t('admin63')}</h1>
                        <form className="mx-auto mt-5" onSubmit={storeCategory}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">{t('admin64')}</label>
                                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={t('admin65')} required />
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
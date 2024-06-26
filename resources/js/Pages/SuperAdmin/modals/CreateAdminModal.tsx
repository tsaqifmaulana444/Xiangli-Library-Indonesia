import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import toast, { Toaster } from 'react-hot-toast'

interface modalProps {
    closeModal: () => void
}

export default function BookModal({ closeModal }: modalProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

    const storeBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Inertia.post('/super-admin/admins', {
            name: name,
            email: email,
            phone_number: phoneNumber,
            password: password,
        })
        toast.success('Data Successfully Created!')
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
                        <h1 className='font-bold text-[20px]'>{t('super_admin8')}</h1>
                        <form className="mx-auto mt-5" onSubmit={storeBook}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">{t('super_admin2')}</label>
                                <input autoComplete='off' type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={t('super_admin2')} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{t('super_admin3')}</label>
                                <input autoComplete='off' type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={t('super_admin3')} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">{t('super_admin4')}</label>
                                <input autoComplete='off' type="text" id="phone_number" name="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g: +86123456789" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">{t('super_admin11')}</label>
                                <input autoComplete='off' type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={t('super_admin11')} required />
                            </div>
                            <div className="flex">
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={closeModal}>{t('super_admin9')}</button>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3">{t('super_admin10')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}   

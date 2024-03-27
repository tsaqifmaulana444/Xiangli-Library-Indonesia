import { Link, Head } from '@inertiajs/react'
import { useState } from 'react'
import { PageProps } from '@/types'
import { FormEvent } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function SignIn() {
  const appName = "Sign Up"
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()

  const storeUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Inertia.post('/sign-up', {
        name: name,
        password: password,
        email: email,
        phone_number: phoneNumber,
        birth_date: birthDate,
        address: address,
    })
  }

  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <Link href="/">
            <div className="flex justify-center mb-6">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-25 h-15"
              />
            </div>
          </Link>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mb-5">
            {t('sign_up1')}
          </h1>
          <form onSubmit={storeUser}>
            <div className="flex gap-2">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
                  {t('sign_up2')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                  {t('sign_up3')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm text-gray-600">
                  {t('sign_up4')}
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="birthDate" className="block mb-2 text-sm text-gray-600">
                  {t('sign_up5')}
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-4 pr-9 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2 text-sm text-gray-600">
                  {t('sign_up6')}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-gray-600"
                >
                  {t('sign_up7')}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
               
              </div>
            </div>
            <button
              type="submit"
              className="w-32 bg-gradient-to-r from-[#4E00D3] to-[#7A36F0] text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
            >
              {t('nav_signup')}
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              {t('sign_up8')}{" "}
              <a href="/sign-in" className="text-cyan-600">
              {t('nav_signin')}
              </a>
            </p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-10">© 2024 Xiangli</p>
        </div>
      </div>

    </>
  )
}

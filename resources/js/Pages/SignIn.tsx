import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent, useState } from 'react'

export default function SignIn() {
  const appName = "Sign In"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const storeAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Inertia.post('/sign-in', {
        email: email,
        password: password,
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
            <div className="flex justify-center mb-8">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-25 h-15"
              />
            </div>
          </Link>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Login To Continue
          </h1>
          <form onSubmit={storeAuth}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                Email
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
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600"
              >
                Password
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
              {/* <a href="#" className="block text-right text-xs text-cyan-600 mt-2">
                忘记密码?
              </a> */}
            </div>
            <button
              type="submit"
              className="w-32 bg-gradient-to-r from-[#4E00D3] to-[#7A36F0] text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
            >
              Sign In
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-cyan-600">
                Sign Up
              </a>
            </p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-10">© 2024 Xiangli</p>
        </div>
      </div>

    </>
  )
}

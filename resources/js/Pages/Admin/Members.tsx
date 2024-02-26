import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

interface Member {
  id?: string
  name: string
  email: string
  address: string
  phone_number: string
  birth_date: string
}

export default function Members({ members }: PageProps<{ members: Member[] }>) {
  const appName = "Members"
  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 bg-white'>
          <div className="w-[92%] mx-auto">
            <Navbar />
            <section className="">
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>Members</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Birth Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {members.map((member, index) => (
                      <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{member.name}</td>
                        <td className="px-6 py-4 text-center">{member.email}</td>
                        <td className="px-6 py-4 text-center">{member.address}</td>
                        <td className="px-6 py-4 text-center">{member.phone_number}</td>
                        <td className="px-6 py-4 text-center">{member.birth_date}</td>
                        <td className="px-6 py-4 text-center">
                          <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Delete</button>
                          <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </section>
          </div>
        </main>
      </div>
    </>
  )
}

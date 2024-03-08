import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Inertia } from '@inertiajs/inertia'
import { FormEvent } from 'react'

interface Borrow {
  id?: string
  user_id: string
  book_id: string
  amount: string
  borrow_in: string
  borrow_out: string
  status: string
}

export default function Borrowers({ borrows }: PageProps<{ borrows: Borrow[] }>) {
  const appName = "List Of Borrowers"

  const approveBorrow = async (id: string | undefined) => {
    Inertia.put(`/admin/borrowers/${id}`, {
      status: "On Read",
    });
  }

  const deleteBorrower = async (id: string | undefined) => {
    Inertia.delete(`/admin/borrowers/${id}`)
  }

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
              <h1 className='mt-4 mb-8 font-bold text-[22px]'>Borrowers</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Borrower
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Book Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Borrow Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Return Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrows.map((borrow, index) => (
                      <tr key={borrow.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 text-center">{borrow.user_id}</td>
                        <td className="px-6 py-4 text-center">{borrow.book_id}</td>
                        <td className="px-6 py-4 text-center">{borrow.amount}</td>
                        <td className="px-6 py-4 text-center">{borrow.borrow_in}</td>
                        <td className="px-6 py-4 text-center">{borrow.borrow_out}</td>
                        <td className="px-6 py-4 text-center">{borrow.status}</td>
                        <td className="px-6 py-4 text-center">
                          {borrow.status === 'Waiting' ? (
                            <>
                              <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => deleteBorrower(borrow.id)}>Reject</button>
                              <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => approveBorrow(borrow.id)}>Approve</button>
                            </>
                          ) : <p>-</p>}
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

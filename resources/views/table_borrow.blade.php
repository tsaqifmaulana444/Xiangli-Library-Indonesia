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
      </tr>
    </thead>
    <tbody>
      @php
          $no = 1;
      @endphp
      @foreach ($borrows as $borrow)
        <tr>
          <td className="px-6 py-4 font-medium t  ext-gray-900 whitespace-nowrap">{{ $no++ }}</td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{{$borrow->user_id}}</td>
          <td className="px-6 py-4 text-center">{{$borrow->book_id}}</td>
          <td className="px-6 py-4 text-center">{{$borrow->quantity}}</td>
          <td className="px-6 py-4 text-center">{{$borrow->borrow_in}}</td>
          <td className="px-6 py-4 text-center">{{$borrow->borrow_out}}</td>
          <td className="px-6 py-4 text-center">{{$borrow->status}}</td>
        </tr>
      @endforeach
    </tbody>
  </table>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-center">
          #
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Book Name
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Date Published
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Author
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Stock
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      @php
          $no = 1;
      @endphp
      @foreach ($books as $book)
        <tr>
          <td className="px-6 py-4 font-medium t  ext-gray-900 whitespace-nowrap">{{ $no++ }}</td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{{$book->name}}</td>
          <td className="px-6 py-4 text-center">{{$book->date}}</td>
          <td className="px-6 py-4 text-center">{{$book->author}}</td>
          <td className="px-6 py-4 text-center">{{$book->stock}}</td>
          <td className="px-6 py-4 text-center">{{$book->description}}</td>
        </tr>
      @endforeach
    </tbody>
  </table>
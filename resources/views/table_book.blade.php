<table>
    <thead>
      <tr>
        <th scope="col" style="background-color: rgb(6, 169, 6); width: 40px;">
          #
        </th>
        <th scope="col" style="background-color: rgb(6, 169, 6); width: 100px;">
          Book Name
        </th>
        <th scope="col" style="background-color: rgb(6, 169, 6); width: 120px;">
          Date Published
        </th>
        <th scope="col" style="background-color: rgb(6, 169, 6); width: 70px;">
          Author
        </th>
        <th scope="col" style="background-color: rgb(6, 169, 6); width: 70px;">
          Stock
        </th>
        <th scope="col" style="background-color: rgb(6, 169, 6); width: 70px;">
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
          <td>{{ $no++ }}</td>
          <td>{{$book->name}}</td>
          <td>{{$book->date}}</td>
          <td>{{$book->author}}</td>
          <td>{{$book->stock}}</td>
          <td>{{$book->description}}</td>
        </tr>
      @endforeach
    </tbody>
  </table>
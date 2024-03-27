<table>
    <thead>
      <tr>
        <th style="background-color: rgb(6, 169, 6); width: 40px;">
          #
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Borrower
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Book Name
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Quantity
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Borrow Date
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Return Date
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Status
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Quality
        </th>
        <th style="background-color: rgb(6, 169, 6); width: 100px;" >
          Is Paying Fine
        </th>
      </tr>
    </thead>
    <tbody>
      @php
          $no = 1;
      @endphp
      @foreach ($borrows as $borrow)
        <tr>
          <td>{{ $no++ }}</td>
          <td>{{$borrow->user->name}}</td>
          <td>{{$borrow->book->name}}</td>
          <td>{{$borrow->amount}}</td>
          <td>{{$borrow->borrow_in}}</td>
          <td>{{$borrow->borrow_out}}</td>
          <td>{{$borrow->status}}</td>
          <td>{{$borrow->book_quality}}</td>
          <td>{{$borrow->pay_fine}}</td>
        </tr>
      @endforeach
    </tbody>
  </table>
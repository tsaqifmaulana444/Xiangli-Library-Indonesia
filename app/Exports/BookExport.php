<?php

namespace App\Exports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class BookExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $datas = Book::all();
        return view('table_book', ['books' => $datas]);
    }
}

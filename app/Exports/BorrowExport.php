<?php

namespace App\Exports;

use App\Models\Book;
use App\Models\BookUser;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class BorrowExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $datas = BookUser::latest()->get();
        foreach ($datas as $key => $value) {
            $names = User::find($value->user_id);
            $datas[$key]->user = $names;
        }

        foreach ($datas as $key => $value) {
            $names = Book::find($value->book_id);
            $datas[$key]->book = $names;
        }
        
        return view('table_borrow', ['borrows' => $datas]);
    }
}

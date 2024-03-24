<?php

namespace App\Exports;

use App\Models\BookUser;
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
        return view('table_borrow', ['borrows' => $datas]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Exports\BookExport;
use App\Exports\BorrowExport;
use App\Models\Book;
use App\Models\BookUser;
use App\Models\Category;
use App\Models\LateAlert;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\FromView;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        $members = User::where('role', '=', 1)->count();
        $books = Book::count();
        $actives = BookUser::where('status', '=', 'On Read')->count();
        $categories = Category::count();
        $mostFrequentBookId = BookUser::groupBy('book_id')
            ->selectRaw('book_id, COUNT(*) as count')
            ->orderByDesc('count')
            ->value('book_id');

        $top = BookUser::where('book_id', $mostFrequentBookId)->first();

        return Inertia::render('Admin/Dashboard', [
            'members' => $members,
            'books' => $books,
            'actives' => $actives,
            'categories' => $categories,
            'book_id' => 1,
            'amount' => 1,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
        ]);
    }

    public function book_export()
    {
        return Excel::download(new BookExport, 'book report.xlsx');
    }

    public function borrow_export()
    {
        return Excel::download(new BorrowExport, 'borrow report.xlsx');
    }

    public function borrowers(): Response
    {
        $borrows = BookUser::latest()->get();
        foreach ($borrows as $key => $value) {
            $names = User::find($value->user_id);
            $borrows[$key]->user = $names;
        }

        foreach ($borrows as $key => $value) {
            $names = Book::find($value->book_id);
            $borrows[$key]->book = $names;
        }

        return Inertia::render('Admin/Borrowers', [
            'borrows' => $borrows,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
        ]);
    }

    public function approve_borrowers($id)
    {
        $data = BookUser::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Record not found!');
        }

        $data->update([
            'status' => 'On Read',
        ]);

        return redirect()->route('admin.borrowers')->with('success', 'Approved!');
    }

    public function book_okay($id)
    {
        $data = BookUser::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Record not found!');
        }

        $data->update([
            'book_quality' => 'Okay',
        ]);

        return redirect()->route('admin.borrowers')->with('success', 'Success!');
    }

    public function book_broken($id)
    {
        $data = BookUser::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Record not found!');
        }

        $data->update([
            'book_quality' => 'Broken',
            'pay_fine' => true,
        ]);

        return redirect()->route('admin.borrowers')->with('success', 'Success!');
    }

    public function delete_borrowers($id)
    {
        $borrower = BookUser::find($id);

        if ($borrower) {
            $borrower->delete();
            return redirect()->route('admin.borrowers')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('admin.borrowers')->with('error', 'Data not found!');
        }
    }

    public function members(): Response
    {
        $members = User::where('role', '1')->latest()->get();
        return Inertia::render('Admin/Members', [
            'members' => $members,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
        ]);
    }

    public function delete_members($id)
    {
        $member = User::find($id);

        if ($member) {
            $member->delete();
            return redirect()->route('admin.members')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('admin.members')->with('error', 'Data not found!');
        }
    }

    public function books_panel(): Response
    {
        $categories = Category::latest()->get();
        $books = Book::with('categories')->latest()->get();
        return Inertia::render('Admin/BooksPanel', [
            'categories' => $categories,
            'books' => $books,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ]);
    }

    public function store_book(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'date' => 'required',
            'author' => 'required',
            'stock' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageName = $request->file('image')->store('public/book');

        $book = Book::create([
            'name' => $request->name,
            'date' => $request->date,
            'author' => $request->author,
            'stock' => $request->stock,
            'description' => $request->description,
            'image' => $imageName
        ]);

        $book->categories()->attach($request->categories);

        return redirect()->route('admin.books_panel')->with('success', 'Data Successfully Added!');
    }

    public function update_book(Request $request, $id)
    {
        // dd($request->all());

        $book = Book::find($id);

        // $imageName = $request->file('image')->store('public/book');

        $book->update([
            'name' => $request->name,
            'date' => $request->date,
            'author' => $request->author,
            'stock' => $request->stock,
            'description' => $request->description,
            // 'image' => $imageName
        ]);

        // dd($request->categories);

        $book->categories()->sync($request->categories);

        return redirect()->route('admin.books_panel')->with('success', 'Data Successfully Updated!');
    }


    public function delete_book($id)
    {
        $book = Book::find($id);

        if ($book) {
            $book->delete();
            return redirect()->route('admin.books_panel')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('admin.books_panel')->with('error', 'Data not found!');
        }
    }

    public function categories(): Response
    {
        $categories = Category::latest()->get();

        return Inertia::render('Admin/Categories', [
            'categories' => $categories,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ]);
    }

    public function store_categories(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Category::create([
            'name' => $request->name
        ]);

        return redirect()->route('admin.categories')->with('success', 'Data Successfully Added!');
    }

    public function delete_categories($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return redirect()->route('admin.categories')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('admin.categories')->with('error', 'Data not found!');
        }
    }

    public function book_excel()
    {
        $books = Book::with('categories')->latest()->get();
        return view('table_book', compact('books'));
    }

    public function borrow_excel()
    {

        $borrows = BookUser::latest()->get();
        foreach ($borrows as $key => $value) {
            $names = User::find($value->user_id);
            $borrows[$key]->user = $names;
        }

        foreach ($borrows as $key => $value) {
            $names = Book::find($value->book_id);
            $borrows[$key]->book = $names;
        }

        return view('table_borrow', compact('borrows'));
    }

    public function late_alert(Request $request)
    {
        $student = User::where('id', '=', $request->borrow['user_id'])->first();
        $book = Book::where('id', '=', $request->borrow['book_id'])->first();
        $message = 'Dear Student ' . $student->name . ', Please Return The Book'. $book->name .' To The Library, Thanks';

        LateAlert::create([
            'user_id' => $request->borrow['user_id'],
            'message' => $message,
            'admin' => auth()->user()->name,
        ]);

        return redirect()->route('admin.borrowers')->with('success', 'Data Successfully Added!');
    }
}

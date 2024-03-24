<?php

namespace App\Http\Controllers;

use App\Exports\BookExport;
use App\Exports\BorrowExport;
use App\Models\Book;
use App\Models\BookUser;
use App\Models\Category;
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
            'book_id' => $top->book_id,
            'amount                                                                                                                                     ' => $top->amount,
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
        return Inertia::render('Admin/Borrowers', [
            'borrows' => $borrows,
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
            'members' => $members
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
            'books' => $books
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
        return view('table_borrow', compact('borrows'));
    }
    
}

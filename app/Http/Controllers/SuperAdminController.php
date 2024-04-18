<?php

namespace App\Http\Controllers;

use App\Exports\BookExport;
use App\Exports\BorrowExport;
use App\Models\Admin;
use App\Models\Book;
use App\Models\BookUser;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;

class SuperAdminController extends Controller
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

        return Inertia::render('SuperAdmin/Dashboard', [
            'members' => $members,
            'books' => $books,
            'actives' => $actives,
            'categories' => $categories,
            'book_id' => 1,
            'amount' => 2,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ]);
    }
    
    public function books_panel(): Response
    {
        $categories = Category::latest()->get();
        $books = Book::with('categories')->latest()->get();
        return Inertia::render('SuperAdmin/BooksPanel', [
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

        return redirect()->route('super-admin.books_panel')->with('success', 'Data Successfully Added!');
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

        return redirect()->route('super-admin.books_panel')->with('success', 'Data Successfully Updated!');
    }


    public function delete_book($id)
    {
        $book = Book::find($id);

        if ($book) {
            $book->delete();
            return redirect()->route('super-admin.books_panel')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('super-admin.books_panel')->with('error', 'Data not found!');
        }
    }

    public function admins(): Response
    {
        $admins = User::where('role', 2)->latest()->get();
        return Inertia::render('SuperAdmin/Admins', [
            'admins' => $admins,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ]);
    }

    public function store_admin(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
            'password' => 'required',
        ]);

        $hashedPassword = Hash::make($request->password);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => $hashedPassword,
            'role' => "2"
        ]);

        return redirect()->route('super-admin.admins')->with('success', 'Data Successfully Added!');
    }

    public function delete_admin($id)
    {
        $admin = User::find($id);

        if ($admin) {
            $admin->delete();
            return redirect()->route('super-admin.admins')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('super-admin.admins')->with('error', 'Data not found!');
        }
    }

    public function categories(): Response
    {
        $categories = Category::latest()->get();

        return Inertia::render('SuperAdmin/Categories', [
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

        return redirect()->route('super-admin.categories')->with('success', 'Data Successfully Added!');
    }

    public function delete_categories($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return redirect()->route('suoer-admin.categories')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('super-admin.categories')->with('error', 'Data not found!');
        }
    }

    public function book_export()
    {
        return Excel::download(new BookExport, 'book report.xlsx');
    }

    public function borrow_export()
    {
        return Excel::download(new BorrowExport, 'borrow report.xlsx');
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
}

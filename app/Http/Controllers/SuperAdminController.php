<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SuperAdminController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('SuperAdmin/Dashboard');
    }
    
    public function books_panel(): Response
    {
        $categories = Category::latest()->get();
        $books = Book::latest()->get();
        return Inertia::render('SuperAdmin/BooksPanel', [
            'categories' => $categories,
            'books' => $books
        ]);
    }

    public function store_book(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'date' => 'required',
            'author' => 'required',
            'stock' => 'required',
            'description' => 'required',
            'categories' => 'required',
        ]);

        Book::create([
            'name' => $request->name,
            'date' => $request->date,
            'author' => $request->author,
            'stock' => $request->stock,
            'description' => $request->description,
            'categories' => $request->categories,
        ]);

        return redirect()->route('super-admin.books_panel')->with('success', 'Data Successfully Added!');
    }

    public function update_book(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'date' => 'required',
            'author' => 'required',
            'stock' => 'required',
            'description' => 'required',
            'categories' => 'required',
        ]);

        $book = Book::findOrFail($id);

        $book->update([
            'name' => $request->name,
            'date' => $request->date,
            'author' => $request->author,
            'stock' => $request->stock,
            'description' => $request->description,
            'categories' => $request->categories,
        ]);

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
            'admins' => $admins
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
}

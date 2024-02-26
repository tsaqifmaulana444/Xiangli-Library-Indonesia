<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

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
}

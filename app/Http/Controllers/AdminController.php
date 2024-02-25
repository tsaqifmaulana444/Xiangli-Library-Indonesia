<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function borrowers(): Response
    {
        return Inertia::render('Admin/Borrowers');
    }

    public function members(): Response
    {
        return Inertia::render('Admin/Members');
    }

    public function books_panel(): Response
    {
        $categories = Category::latest()->get();
        return Inertia::render('Admin/BooksPanel', [
            'categories' => $categories,
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

        return redirect()->route('admin.books_panel')->with('success', 'Data Successfully Added!');
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
}

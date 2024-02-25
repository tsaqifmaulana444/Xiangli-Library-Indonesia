<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Admin/BooksPanel');
    }

    public function categories(): Response
    {
        return Inertia::render('Admin/Categories');
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
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Users/User');
    }

    public function list_book(): Response
    {
        return Inertia::render('Users/ListBook');
    }

    public function history(): Response
    {
        return Inertia::render('Users/History');
    }

    public function categories(): Response
    {
        $categories = Category::latest()->get();

        return Inertia::render('Users/Categories', [
            'categories' => $categories,
        ]);
    }
}

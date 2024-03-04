<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookUser;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Users/User');
    }

    public function list_book(): Response
    {
        $books = Book::latest()->get();
        return Inertia::render('Users/ListBook', [
            'books' => $books
        ]);
    }

    public function store_borrow(Request $request)
    {
        $userId = Auth::id();
        $bookId = $request->input('book_id');

        $user = User::find($userId);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $user->books()->attach($bookId, [
            'amount' => $request->input('amount'),
            'borrow_in' => $request->input('borrow_in'),
            'borrow_out' => $request->input('borrow_out'),
        ]);

        return redirect()->route('user.history')->with('success', 'Data Successfully Added!');
    }

    public function history(): Response
    {
        $userId = Auth::id();
        $borrows = BookUser::latest()->where('user_id', '=', $userId)->get();
        // dd($borrows);
        return Inertia::render('Users/History', [
            'borrows' => $borrows,
        ]);
    }

    public function categories(): Response
    {
        $categories = Category::latest()->get();

        return Inertia::render('Users/Categories', [
            'categories' => $categories,
        ]);
    }
}

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
        $books = BookUser::where('user_id', '=', Auth::user()->id)->count();
        $actives = BookUser::where('status', '=', 'On Read')->where('user_id', '=', Auth::user()->id)->count();
        $categories = Category::count();
        return Inertia::render('Users/User', [
            'books' => $books,
            'actives' => $actives,
            'categories' => $categories,
        ]);
    }

    public function list_book(): Response
    {
        $books = Book::with('categories')->latest()->get();
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

    public function delete_borrow($id)
    {
        $borrower = BookUser::find($id);

        if ($borrower) {
            $borrower->delete();
            return redirect()->route('user.history')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('user.history')->with('error', 'Data not found!');
        }
    }

    public function done_borrow($id)
    {
        $data = BookUser::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Record not found!');
        }

        $data->update([
            'status' => 'Done',
        ]);

        return redirect()->route('user.history')->with('success', 'Approved!');
    }

    public function amend_borrow(Request $request, $id)
    {
        $request->validate([
            'amount'   => 'required',
            'borrow_in' => 'required',
            'borrow_out' => 'required',
        ]);

        $data = BookUser::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Record not found!');
        }

        $data->update([
            'amount'     => $request->amount,
            'borrow_in'  => $request->borrow_in,
            'borrow_out' => $request->borrow_out,
        ]);

        return redirect()->route('user.history')->with('success', 'Data Successfully Updated!');
    }

    public function categories(): Response
    {
        $categories = Category::latest()->get();

        return Inertia::render('Users/Categories', [
            'categories' => $categories,
        ]);
    }
}

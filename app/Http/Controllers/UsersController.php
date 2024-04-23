<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookUser;
use App\Models\Category;
use App\Models\Rating;
use App\Models\User;
use App\Models\LateAlert;
use App\Models\UserBook;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function dashboard(): Response
    {
        $books = BookUser::where('user_id', '=', Auth::user()->id)->count();
        $actives = BookUser::where('status', '=', 'On Read')->where('user_id', '=', Auth::user()->id)->count();
        $categories = Category::count();    
        $recommended = Book::all()->random(1);
        $recommended2 = Book::all()->random(1);
        // $results = DB::select('SELECT * FROM GetActiveUsers()');
        // dd($results);

        return Inertia::render('Users/User', [
            'books' => $books,
            'actives' => $actives,
            'categories' => $categories,
            'recommended' => $recommended,
            'recommended2' => $recommended2,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ]);
    }

    public function list_book(): Response
    {
        $books = Book::with('categories')->latest()->get();
        $bookmarks = UserBook::where('user_id', '=', auth()->user()->id)->get();
        $ratings = Rating::whereIn('book_id', $books->pluck('id'))->get();
        $ratingsCount = Rating::whereIn('book_id', $books->pluck('id'))
        ->select('book_id', DB::raw('count(*) as total'))
        ->groupBy('book_id')
        ->get()
        ->keyBy('book_id');


        $booksWithRatings = $books->map(function ($book) use ($ratings, $ratingsCount) {
            $book->rating = $ratings->where('book_id', $book->id)->avg('star');
            $book->ratings_count = $ratingsCount->has($book->id) ? $ratingsCount[$book->id]->total : 0;
            return $book;
        });        

        return Inertia::render('Users/ListBook', [
            'books' => $booksWithRatings,
            'bookmarks' => $bookmarks,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
            'user_id' => auth()->user()->id
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
        foreach ($borrows as $key => $value) {
            $names = Book::find($value->user_id);
            $borrows[$key]->book = $names;
        }

        // dd($borrows);
        return Inertia::render('Users/History', [
            'borrows' => $borrows,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
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

    public function pay_fine($id)
    {
        $data = BookUser::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Record not found!');
        }

        $data->update([
            'pay_fine' => false,
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

    public function bookmark()
    {
        $books = Book::with('categories')->latest()->get();
        $bookmarks = UserBook::where('user_id', '=', auth()->user()->id)->get();
        return Inertia::render('Users/Bookmark', [
            'books' => $books,
            'bookmarks' => $bookmarks,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
            'user_id' => auth()->user()->id
        ]);
    }

    public function add_bookmark(Request $request)
    {
        UserBook::create([
            'user_id' => auth()->user()->id,
            'book_id' => $request->book_id,
        ]);

        return redirect()->route('user.list_book')->with('success', 'Data Successfully Added!');
    }

    public function delete_bookmark($id)
    {
        $bookmark = UserBook::where("book_id", "=", $id)->where("user_id", "=", auth()->user()->id)->first();

        if ($bookmark) {
            $bookmark->delete();
            return redirect()->route('user.list_book')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('user.list_book')->with('error', 'Data not found!');
        }
    }

    public function delete_bookmark2($id)
    {
        $bookmark = UserBook::where("book_id", "=", $id)->where("user_id", "=", auth()->user()->id)->first();

        if ($bookmark) {
            $bookmark->delete();
            return redirect()->route('user.bookmark')->with('success', 'Data Successfully Deleted!');
        } else {
            return redirect()->route('user.bookmark')->with('error', 'Data not found!');
        }
    }

    public function add_rating(Request $request)
    {
        Rating::create([
            'user_id' => auth()->user()->id,
            'book_id' => $request->book_id,
            'star' => $request->star,
            'description' => $request->description
        ]);

        $borrow = BookUser::find($request->borrow_id);

        $borrow->update([
            'is_giving_rating' => true,
        ]);

        return redirect()->route('user.dashboard')->with('success', 'Data Successfully Added!');
    }

    public function alert_panel(): Response
    {
        $alerts = LateAlert::where('user_id', '=', auth()->user()->id)->get();
        return Inertia::render('Users/AlertPanel', [
            'alerts' => $alerts,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email
        ]);
    }

    public function dismiss_alert($id)
    {
        $data = LateAlert::find($id);

        $data->update([
            'status' => false,
        ]);

        return redirect()->route('user.alert-panel')->with('success', 'Approved!');
    }
}

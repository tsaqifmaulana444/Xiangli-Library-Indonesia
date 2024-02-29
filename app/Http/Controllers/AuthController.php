<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Index');
    }

    public function sign_in(): Response
    {
        return Inertia::render('SignIn');
    }

    public function auth_data(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors(['email' => 'Email atau password salah.']);
    }


    public function sign_up(): Response
    {
        return Inertia::render('SignUp');
    }

    public function store_user(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'birth_date' => 'required',
            'password' => 'required',
        ]);

        $hashedPassword = Hash::make($request->password);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'birth_date' => $request->birth_date,
            'password' => $hashedPassword,
        ]);

        return redirect()->route('auth.sign_in')->with('success', 'Welcome!');
    }

    public function sign_out()
    {
        Auth::logout();

        return redirect('/');
    }
}

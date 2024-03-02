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
            $role = User::select('role')->where('email', '=', $request->email)->first();
            if($role->role === "1"){
                return redirect()->intended('/dashboard');
            } else if($role->role === "2"){
                return redirect()->intended('/admin/dashboard');
            } else if($role->role === "3"){
                return redirect()->intended('/super-admin/dashboard');
            }
        }

        return back()->withErrors(['email' => "Email or password isn't correct."]);
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

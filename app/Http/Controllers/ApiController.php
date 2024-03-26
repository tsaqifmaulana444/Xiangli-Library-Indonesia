<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    public function store(Request $request)
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

        $customer = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'birth_date' => $request->birth_date,
            'password' => $hashedPassword,
            'role' => 3
        ]);

        return response()->json([
            'data' => $customer,
            'status_code' => 200,
            'msg' => 'Success',
        ]);
    }
}

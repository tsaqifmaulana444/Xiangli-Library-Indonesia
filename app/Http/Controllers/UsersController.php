<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Users/User');
    }
}

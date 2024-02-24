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

    public function list_book(): Response
    {
        return Inertia::render('Users/ListBook');
    }
}

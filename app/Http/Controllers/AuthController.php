<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}

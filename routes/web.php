<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::prefix('')->group(function(){
    Route::get('/', [AuthController::class, 'index'])->name('auth.index');
    Route::get('/sign-in', [AuthController::class, 'sign_in'])->name('auth.sign_in');
    Route::get('/dashboard', [UsersController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/list-book', [UsersController::class, 'list_book'])->name('user.list_book');

});

Route::prefix('/admin')->group(function(){
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

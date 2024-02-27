<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::prefix('')->group(function(){
    Route::get('/', [AuthController::class, 'index'])->name('auth.index');
    Route::get('/sign-in', [AuthController::class, 'sign_in'])->name('auth.sign_in');
    Route::get('/dashboard', [UsersController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/list-book', [UsersController::class, 'list_book'])->name('user.list_book');
    Route::get('/history', [UsersController::class, 'history'])->name('user.history');
    Route::get('/categories', [UsersController::class, 'categories'])->name('user.categories');
});

Route::prefix('/admin')->group(function(){
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    Route::get('/borrowers', [AdminController::class, 'borrowers'])->name('admin.borrowers');

    Route::get('/members', [AdminController::class, 'members'])->name('admin.members');
    Route::delete('/member/{id}', [AdminController::class, 'delete_members'])->name('admin.delete_member');

    Route::get('/books-panel', [AdminController::class, 'books_panel'])->name('admin.books_panel');
    Route::post('/books-panel', [AdminController::class, 'store_book'])->name('admin.store_book');
    Route::put('/books-panel/{id}', [AdminController::class, 'update_book'])->name('admin.update_book');
    Route::delete('/books-panel/{id}', [AdminController::class, 'delete_book'])->name('admin.delete_book');

    Route::get('/categories', [AdminController::class, 'categories'])->name('admin.categories');
    Route::post('/categories', [AdminController::class, 'store_categories'])->name('admin.store_categories');
    Route::delete('/categories/{id}', [AdminController::class, 'delete_categories'])->name('admin.delete_categories');
});

Route::prefix('/super-admin')->group(function(){
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard'])->name('super-admin.dashboard');

    Route::get('/books-panel', [SuperAdminController::class, 'books_panel'])->name('super-admin.books_panel');
    Route::post('/books-panel', [SuperAdminController::class, 'store_book'])->name('super-admin.store_book');
    Route::put('/books-panel/{id}', [SuperAdminController::class, 'update_book'])->name('super-admin.update_book');
    Route::delete('/books-panel/{id}', [SuperAdminController::class, 'delete_book'])->name('super-admin.delete_book');

    Route::get('/admins', [SuperAdminController::class, 'admins'])->name('super-admin.admins');
    Route::post('/admins', [SuperAdminController::class, 'store_admin'])->name('super-admin.store_admin');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

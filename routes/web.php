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
    Route::post('/sign-in', [AuthController::class, 'auth_data'])->name('auth.auth_data');

    Route::get('/sign-up', [AuthController::class, 'sign_up'])->name('auth.sign_up');
    Route::post('/sign-up', [AuthController::class, 'store_user'])->name('auth.store_user');

    Route::post('/sign-out', [AuthController::class, 'sign_out'])->name('auth.sign_out');

    Route::get('/dashboard', [UsersController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/list-book', [UsersController::class, 'list_book'])->name('user.list_book');
    Route::post('/borrow-book', [UsersController::class, 'store_borrow'])->name('user.borrow');
    Route::delete('/borrow-book/{id}', [UsersController::class, 'delete_borrow'])->name('user.delete_borrow');
    
    Route::get('/history', [UsersController::class, 'history'])->name('user.history');
    Route::put('/borrow-book/{id}', [UsersController::class, 'amend_borrow'])->name('user.amend_borrow');
    Route::put('/done-borrow-book/{id}', [UsersController::class, 'done_borrow'])->name('user.done_borrow');
});

Route::prefix('/admin')->group(function(){
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/book_export', [AdminController::class, 'book_export'])->name('admin.book_export');
    Route::get('/borrow_export', [AdminController::class, 'borrow_export'])->name('admin.borrow_export');
    Route::get('/book_export_page', [AdminController::class, 'book_excel'])->name('admin.book_excel');
    Route::get('/borrow_export_page', [AdminController::class, 'borrow_excel'])->name('admin.borrow_excel');

    Route::get('/borrowers', [AdminController::class, 'borrowers'])->name('admin.borrowers');
    Route::delete('/borrowers/{id}', [AdminController::class, 'delete_borrowers'])->name('admin.delete_borrowers');
    Route::put('/borrowers/{id}', [AdminController::class, 'approve_borrowers'])->name('admin.approve_borrowers');

    Route::put('/book-okay/{id}', [AdminController::class, 'book_okay'])->name('admin.book_okay');
    Route::put('/book-broken/{id}', [AdminController::class, 'book_broken'])->name('admin.book_broken');

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
    Route::delete('/admins/{id}', [SuperAdminController::class, 'delete_admin'])->name('super-admin.delete_admin');

    Route::get('/book_export', [SuperAdminController::class, 'book_export'])->name('super-admin.book_export');
    Route::get('/borrow_export', [SuperAdminController::class, 'borrow_export'])->name('super-admin.borrow_export');
    Route::get('/book_export_page', [SuperAdminController::class, 'book_excel'])->name('super-admin.book_excel');
    Route::get('/borrow_export_page', [SuperAdminController::class, 'borrow_excel'])->name('super-admin.borrow_excel');

});


require __DIR__.'/auth.php';

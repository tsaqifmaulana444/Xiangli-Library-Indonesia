<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;


Route::get('/dashboard', function () {
    
});

Route::prefix('')->group(function(){
    Route::get('/', [AuthController::class, 'index'])->name('auth.index');
    Route::get('/profile', [AuthController::class, 'signin'])->name('auth.signin');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

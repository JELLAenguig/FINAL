<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController; 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TicketController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

    Route::get('deptdashboard', [DashboardController::class, 'deptDashboard'])
    ->middleware(['auth', 'verified'])
    ->name('deptdashboard');

// User Management Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
});

// Reports and Settings Routes
Route::get('/reports', function () {
    return Inertia::render('Admin/Reports');  
})->middleware(['auth', 'verified'])->name('reports');

Route::get('/settings', function () {
    return Inertia::render('Admin/Settings');  
})->middleware(['auth', 'verified'])->name('settings');


// Kiosk Routes
Route::get('/kiosk', [ServiceController::class, 'index'])->name('kiosk.index');

Route::get('/kiosk/animal-bite', [ServiceController::class, 'showAnimalBite'])->name('kiosk.animal-bite');

Route::get('/kiosk/ticket', [TicketController::class, 'show'])->name('kiosk.ticket');
Route::post('/kiosk/tickets', [TicketController::class, 'store']); 

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

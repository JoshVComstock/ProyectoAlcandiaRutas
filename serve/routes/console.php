<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\UserController;

// Rutas del Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->name('api.dashboard.index');
Route::get('/dashboard/heatmap', [DashboardController::class, 'heatmap'])->name('api.dashboard.heatmap');

// Rutas de Reportes
Route::get('/reports', [ReportController::class, 'index'])->name('api.reports.index');
Route::get('/reports/{report}', [ReportController::class, 'show'])->name('api.reports.show');
Route::post('/reports', [ReportController::class, 'store'])->name('api.reports.store');

// Rutas de Rutas (RouteController)
Route::get('/routes', [RouteController::class, 'index'])->name('api.routes.index');
Route::get('/routes/{route}', [RouteController::class, 'show'])->name('api.routes.show');
Route::post('/routes', [RouteController::class, 'store'])->name('api.routes.store');
Route::put('/routes/{route}', [RouteController::class, 'update'])->name('api.routes.update');
Route::delete('/routes/{route}', [RouteController::class, 'destroy'])->name('api.routes.destroy');

// Rutas de Usuarios
Route::get('/users', [UserController::class, 'index'])->name('api.users.index');
Route::get('/users/{user}', [UserController::class, 'show'])->name('api.users.show');
Route::post('/users', [UserController::class, 'store'])->name('api.users.store');
Route::put('/users/{user}', [UserController::class, 'update'])->name('api.users.update');
Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('api.users.destroy');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
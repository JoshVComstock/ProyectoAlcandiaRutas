<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Routes
    Route::post('/routes/start', [RouteController::class, 'startRoute']);
    Route::post('/routes/{route}/update', [RouteController::class, 'updateRoute']);
    Route::post('/routes/{route}/end', [RouteController::class, 'endRoute']);
    Route::get('/routes/active', [RouteController::class, 'getActiveRoute']);
    Route::get('/routes', [RouteController::class, 'getUserRoutes']);
});

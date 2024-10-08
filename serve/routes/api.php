<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\TransportModeController;
use App\Http\Controllers\TrafficInfoController;
use App\Http\Controllers\PublicTransportController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GamificationController;
use Illuminate\Support\Facades\Route;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas por autenticación
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas
    Route::apiResource('routes', RouteController::class);
    Route::post('/routes/{route}/optimize', [RouteController::class, 'optimize']);

    // Modos de transporte
    Route::apiResource('transport-modes', TransportModeController::class);

    // Información de tráfico
    Route::apiResource('traffic-info', TrafficInfoController::class);
    Route::get('traffic/current', [TrafficInfoController::class, 'getCurrentTraffic']);
    Route::get('traffic/events', [TrafficInfoController::class, 'getScheduledEvents']);
    Route::post('traffic/predict', [TrafficInfoController::class, 'predictTraffic']);

    // Transporte público
    Route::apiResource('public-transports', PublicTransportController::class);
    Route::get('/public-transports/nearby', [PublicTransportController::class, 'nearbyTransports']);

    // Estadísticas
    Route::get('/user/stats', [StatisticsController::class, 'getUserStats']);
    Route::get('/leaderboard', [StatisticsController::class, 'getLeaderboard']);

    // Gamificación
    Route::post('/points/add', [GamificationController::class, 'addPoints']);

    // Usuarios (acceso limitado)
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
});

// Rutas para administradores universitarios y super administradores
Route::middleware(['auth:sanctum', 'role:university_admin,super_admin'])->group(function () {
    Route::get('/admin/stats', [StatisticsController::class, 'getGlobalStats']);
    Route::apiResource('users', UserController::class)->except(['show', 'update']);
});

// Rutas exclusivas para super administradores
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    // Aquí puedes agregar rutas exclusivas para super administradores si es necesario
});
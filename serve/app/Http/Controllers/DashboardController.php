<?php

namespace App\Http\Controllers;

use App\Models\Route;
use App\Models\TransportMode;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener estadísticas generales
        $totalRoutes = Route::count();
        $totalDistance = Route::sum('distancia_recorrida');
        $averageSpeed = Route::avg('velocidad_promedio');
        
        // Obtener estadísticas por modo de transporte
        $transportModes = TransportMode::withCount('routes')->get();

        // Pasar los datos a la vista
        return view('dashboard.index', compact('totalRoutes', 'totalDistance', 'averageSpeed', 'transportModes'));
    }

    public function heatmap()
    {
        // Obtener datos para el mapa de calor
        $heatmapData = Route::with('heatmapPatterns')->get()->flatMap(function ($route) {
            return $route->heatmapPatterns->map(function ($pattern) {
                return [
                    'lat' => $pattern->location[0],
                    'lng' => $pattern->location[1],
                    'intensity' => $pattern->intensidad,
                ];
            });
        });

        // Pasar los datos a la vista del mapa de calor
        return view('dashboard.heatmap', compact('heatmapData'));
    }
}
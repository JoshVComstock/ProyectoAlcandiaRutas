<?php
// app/Http/Controllers/RouteController.php
namespace App\Http\Controllers;

use App\Models\Route;
use App\Services\RouteService;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    protected $routeService;

    public function __construct(RouteService $routeService)
    {
        $this->routeService = $routeService;
    }

    public function startRoute(Request $request)
    {
        $validatedData = $request->validate([
            'start_point' => 'required|array',
            'start_point.lat' => 'required|numeric',
            'start_point.lng' => 'required|numeric',
            'transport_mode' => 'required|string',
        ]);

        $route = $this->routeService->startNewRoute(
            $request->user(),
            $validatedData['start_point'],
            $validatedData['transport_mode']
        );

        return response()->json($route, 201);
    }

    public function updateRoute(Request $request, Route $route)
    {
        // Ajuste en la validación
        $validatedData = $request->validate([
            'current_point' => 'required|array',
            'current_point.lat' => 'required|numeric',
            'current_point.lng' => 'required|numeric',
        ]);

        $updatedRoute = $this->routeService->updateRoutePoints(
            $route,
            $validatedData['current_point']
        );

        return response()->json($updatedRoute);
    }

    public function endRoute(Request $request, Route $route)
    {
        $validatedData = $request->validate([
            'end_point' => 'required|array',
            'end_point.lat' => 'required|numeric',
            'end_point.lng' => 'required|numeric',
        ]);

        $completedRoute = $this->routeService->endRoute(
            $route,
            $validatedData['end_point']
        );

        return response()->json($completedRoute);
    }

    public function getUserRoutes(Request $request)
    {
        $routes = Route::where('user_id', $request->user()->id)
            ->where('is_active', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($routes);
    }

    public function getActiveRoute(Request $request)
    {
        $route = Route::where('user_id', $request->user()->id)
            ->where('is_active', true)
            ->first();

        if (!$route) {
            return response()->json(['message' => 'No hay ruta activa'], 404);
        }

        return response()->json($route);
    }
}

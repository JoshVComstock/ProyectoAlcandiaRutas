<?php

namespace App\Http\Controllers;

use App\Models\Route;
use App\Models\TrafficInfo;
use App\Models\User;
use App\Services\RouteOptimizationService;
use App\Services\TrafficInfoService;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    protected $routeOptimizationService;
    protected $trafficInfoService;

    public function __construct(RouteOptimizationService $routeOptimizationService, TrafficInfoService $trafficInfoService)
    {
        $this->routeOptimizationService = $routeOptimizationService;
        $this->trafficInfoService = $trafficInfoService;
    }

    public function index()
    {
        $routes = Route::all();
        return response()->json($routes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'start_point' => 'required|string',
            'end_point' => 'required|string',
            'waypoints' => 'nullable|array',
            'segments' => 'required|array',
        ]);

        $route = Route::create($validatedData);
        return response()->json($route, 201);
    }

    public function show($id)
    {
        $route = Route::findOrFail($id);
        return response()->json($route);
    }

    public function update(Request $request, $id)
    {
        $route = Route::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string',
            'start_point' => 'string',
            'end_point' => 'string',
            'waypoints' => 'nullable|array',
            'segments' => 'array',
        ]);

        $route->update($validatedData);
        return response()->json($route);
    }

    public function destroy($id)
    {
        $route = Route::findOrFail($id);
        $route->delete();
        return response()->json(null, 204);
    }

    public function optimize($id)
    {
        $route = Route::findOrFail($id);
        $optimizedRoute = $this->routeOptimizationService->optimizeRoute($route);
        return response()->json($optimizedRoute);
    }
}

class TrafficInfoController extends Controller
{
    protected $trafficInfoService;

    public function __construct(TrafficInfoService $trafficInfoService)
    {
        $this->trafficInfoService = $trafficInfoService;
    }

    public function getCurrentTraffic(Request $request)
    {
        $validatedData = $request->validate([
            'locations' => 'required|array',
        ]);

        $trafficInfo = $this->trafficInfoService->getCurrentTrafficInfo($validatedData['locations']);
        return response()->json($trafficInfo);
    }

    public function getScheduledEvents()
    {
        $events = $this->trafficInfoService->getScheduledEvents();
        return response()->json($events);
    }

    public function predictTraffic(Request $request)
    {
        $validatedData = $request->validate([
            'locations' => 'required|array',
            'time' => 'required|date',
        ]);

        $predictedTraffic = $this->trafficInfoService->predictTrafficConditions($validatedData['locations'], $validatedData['time']);
        return response()->json($predictedTraffic);
    }
}

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create($validatedData);
        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'string|min:6',
        ]);

        $user->update($validatedData);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
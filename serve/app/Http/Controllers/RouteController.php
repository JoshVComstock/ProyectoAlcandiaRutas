<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        $routes = Route::with('user', 'transportMode')->paginate(20);
        return view('routes.index', compact('routes'));
    }

    public function show(Route $route)
    {
        return view('routes.show', compact('route'));
    }

    public function create()
    {
        return view('routes.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'start_location' => 'required|array',
            'end_location' => 'required|array',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'transport_mode_id' => 'required|exists:transport_modes,id',
            'distancia_recorrida' => 'required|numeric|min:0',
            'tiempo_total' => 'required|integer|min:0',
            'velocidad_promedio' => 'required|numeric|min:0',
        ]);

        $route = Route::create($validatedData);

        return redirect()->route('routes.show', $route)->with('success', 'Route created successfully.');
    }

    public function edit(Route $route)
    {
        return view('routes.edit', compact('route'));
    }

    public function update(Request $request, Route $route)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'start_location' => 'required|array',
            'end_location' => 'required|array',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'transport_mode_id' => 'required|exists:transport_modes,id',
            'distancia_recorrida' => 'required|numeric|min:0',
            'tiempo_total' => 'required|integer|min:0',
            'velocidad_promedio' => 'required|numeric|min:0',
        ]);

        $route->update($validatedData);

        return redirect()->route('routes.show', $route)->with('success', 'Route updated successfully.');
    }

    public function destroy(Route $route)
    {
        $route->delete();
        return redirect()->route('routes.index')->with('success', 'Route deleted successfully.');
    }
}
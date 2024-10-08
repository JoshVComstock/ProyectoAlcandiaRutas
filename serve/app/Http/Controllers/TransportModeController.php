<?php

namespace App\Http\Controllers;

use App\Models\TransportMode;
use Illuminate\Http\Request;

class TransportModeController extends Controller
{
    public function index()
    {
        $transportModes = TransportMode::all();
        return response()->json($transportModes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string',
            'carbon_footprint' => 'required|numeric',
        ]);

        $transportMode = TransportMode::create($validatedData);

        return response()->json($transportMode, 201);
    }

    public function show(TransportMode $transportMode)
    {
        return response()->json($transportMode);
    }

    public function update(Request $request, TransportMode $transportMode)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'icon' => 'string',
            'carbon_footprint' => 'numeric',
        ]);

        $transportMode->update($validatedData);

        return response()->json($transportMode);
    }

    public function destroy(TransportMode $transportMode)
    {
        $transportMode->delete();
        return response()->json(null, 204);
    }
}
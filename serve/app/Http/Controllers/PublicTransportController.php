<?php

namespace App\Http\Controllers;

use App\Models\PublicTransport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicTransportController extends Controller
{
    public function index()
    {
        $transports = PublicTransport::all();
        return response()->json($transports);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:micro,trufi',
            'route' => 'required|array',
            'route.*.lat' => 'required|numeric',
            'route.*.lng' => 'required|numeric',
            'schedule' => 'required|array',
            'schedule.*.day' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'schedule.*.start_time' => 'required|date_format:H:i',
            'schedule.*.end_time' => 'required|date_format:H:i|after:schedule.*.start_time',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transport = PublicTransport::create($validator->validated());
        return response()->json($transport, 201);
    }

    public function show(PublicTransport $transport)
    {
        return response()->json($transport);
    }

    public function update(Request $request, PublicTransport $transport)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'type' => 'in:micro,trufi',
            'route' => 'array',
            'route.*.lat' => 'numeric',
            'route.*.lng' => 'numeric',
            'schedule' => 'array',
            'schedule.*.day' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'schedule.*.start_time' => 'date_format:H:i',
            'schedule.*.end_time' => 'date_format:H:i|after:schedule.*.start_time',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transport->update($validator->validated());
        return response()->json($transport);
    }

    public function destroy(PublicTransport $transport)
    {
        $transport->delete();
        return response()->json(null, 204);
    }

    public function nearbyTransports(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'radius' => 'required|numeric|min:0|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $radius = $request->input('radius');

        $nearbyTransports = PublicTransport::all()->filter(function ($transport) use ($lat, $lng, $radius) {
            return $this->isPointNearRoute($lat, $lng, $transport->route, $radius);
        });

        return response()->json($nearbyTransports);
    }

    private function isPointNearRoute($lat, $lng, $route, $radius)
    {
        foreach ($route as $point) {
            if ($this->calculateDistance($lat, $lng, $point['lat'], $point['lng']) <= $radius) {
                return true;
            }
        }
        return false;
    }

    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371000; // metros
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        return $earthRadius * $c;
    }
}
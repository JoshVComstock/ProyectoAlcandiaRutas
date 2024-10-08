<?php

namespace App\Http\Controllers;

use App\Models\TrafficInfo;
use App\Services\TrafficInfoService;
use Illuminate\Http\Request;

class TrafficInfoController extends Controller
{
    protected $trafficInfoService;

    public function __construct(TrafficInfoService $trafficInfoService)
    {
        $this->trafficInfoService = $trafficInfoService;
    }

    public function index()
    {
        $trafficInfo = TrafficInfo::all();
        return response()->json($trafficInfo);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'location' => 'required|string',
        'description' => 'required|string',
        'severity' => 'required|in:low,medium,high',
        'start_time' => 'required|date',
        'end_time' => 'required|date|after:start_time',
    ]);

    $trafficInfo = TrafficInfo::create($validatedData);

    SendTrafficAlerts::dispatch($trafficInfo);

    return response()->json($trafficInfo, 201);
}

    public function show(TrafficInfo $trafficInfo)
    {
        return response()->json($trafficInfo);
    }

    public function update(Request $request, TrafficInfo $trafficInfo)
    {
        $validatedData = $request->validate([
            'location' => 'string',
            'description' => 'string',
            'severity' => 'in:low,medium,high',
            'start_time' => 'date',
            'end_time' => 'date|after:start_time',
        ]);

        $trafficInfo->update($validatedData);

        $this->trafficInfoService->notifyAffectedUsers($trafficInfo);

        return response()->json($trafficInfo);
    }

    public function destroy(TrafficInfo $trafficInfo)
    {
        $trafficInfo->delete();
        return response()->json(null, 204);
    }
}
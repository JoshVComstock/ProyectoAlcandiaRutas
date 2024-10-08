<?php

namespace App\Http\Controllers;

use App\Models\Route;
use App\Models\User;
use App\Models\TransportMode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function getUserStats(Request $request)
    {
        $user = $request->user();
        $routes = $user->routes;

        $stats = [
            'total_distance' => $routes->sum('total_distance'),
            'average_time' => $routes->avg('estimated_time'),
            'most_used_transport' => $this->getMostUsedTransport($routes),
            'carbon_footprint' => $this->calculateCarbonFootprint($routes),
            'total_routes' => $routes->count(),
            'total_points' => $user->userScore->points ?? 0,
            'level' => $user->userScore->level ?? 1,
        ];

        return response()->json($stats);
    }

    private function getMostUsedTransport($routes)
    {
        $transportModes = $routes->flatMap(function ($route) {
            return $route->transportModes;
        });

        return $transportModes->groupBy('name')
            ->map->count()
            ->sort()
            ->keys()
            ->last();
    }

    private function calculateCarbonFootprint($routes)
    {
        $carbonFootprint = 0;

        foreach ($routes as $route) {
            foreach ($route->transportModes as $transportMode) {
                $carbonFootprint += $transportMode->carbon_footprint * ($route->total_distance / 1000);
            }
        }

        return round($carbonFootprint, 2);
    }

    public function getGlobalStats()
    {
        $stats = [
            'total_users' => User::count(),
            'total_routes' => Route::count(),
            'average_route_length' => round(Route::avg('total_distance'), 2),
            'most_popular_transport' => $this->getGlobalMostPopularTransport(),
            'total_distance_traveled' => round(Route::sum('total_distance') / 1000, 2), // en km
            'total_carbon_footprint' => $this->getGlobalCarbonFootprint(),
            'users_by_university' => $this->getUsersByUniversity(),
        ];

        return response()->json($stats);
    }

    private function getGlobalMostPopularTransport()
    {
        return DB::table('route_transport_mode')
            ->join('transport_modes', 'route_transport_mode.transport_mode_id', '=', 'transport_modes.id')
            ->select('transport_modes.name', DB::raw('count(*) as total'))
            ->groupBy('transport_modes.name')
            ->orderByDesc('total')
            ->first()
            ->name;
    }

    private function getGlobalCarbonFootprint()
    {
        $totalCarbonFootprint = 0;

        $routes = Route::with('transportModes')->get();

        foreach ($routes as $route) {
            foreach ($route->transportModes as $transportMode) {
                $totalCarbonFootprint += $transportMode->carbon_footprint * ($route->total_distance / 1000);
            }
        }

        return round($totalCarbonFootprint, 2);
    }

    private function getUsersByUniversity()
    {
        return User::groupBy('university_id')
            ->select('university_id', DB::raw('count(*) as total'))
            ->pluck('total', 'university_id');
    }

    public function getLeaderboard()
    {
        $leaderboard = User::with('userScore')
            ->whereHas('userScore')
            ->get()
            ->sortByDesc(function ($user) {
                return $user->userScore->points;
            })
            ->take(10)
            ->values()
            ->map(function ($user) {
                return [
                    'name' => $user->name,
                    'points' => $user->userScore->points,
                    'level' => $user->userScore->level,
                ];
            });

        return response()->json($leaderboard);
    }
}
<?php

namespace App\Services;

use App\Models\Route;
use App\Models\TrafficInfo;
use App\Models\User;
use App\Notifications\TrafficAlertNotification;
use Carbon\Carbon;

class RouteOptimizationService
{
    protected $trafficInfoService;

    public function __construct(TrafficInfoService $trafficInfoService)
    {
        $this->trafficInfoService = $trafficInfoService;
    }

    public function optimizeRoute(Route $route)
    {
        $currentTraffic = $this->trafficInfoService->getCurrentTrafficInfo($this->extractLocations($route));
        $alternativeRoutes = $this->calculateAlternativeRoutes($route, $currentTraffic);
        $optimizedRoute = $this->selectBestRoute($alternativeRoutes);
        return $optimizedRoute;
    }

    protected function extractLocations(Route $route)
    {
        $locations = [$route->start_point, $route->end_point];
        $locations = array_merge($locations, $route->waypoints ?? []);
        return $locations;
    }

    protected function calculateAlternativeRoutes(Route $route, $trafficInfo)
    {
        $alternatives = [];

        // Original route
        $alternatives[] = $route;

        // Alternative 1: Change transport mode in congested segments
        $alt1 = $this->changeTransportMode($route, $trafficInfo);
        if ($alt1) $alternatives[] = $alt1;

        // Alternative 2: Avoid congested areas
        $alt2 = $this->avoidCongestedAreas($route, $trafficInfo);
        if ($alt2) $alternatives[] = $alt2;

        // Alternative 3: Use more sustainable transport options
        $alt3 = $this->useSustainableTransport($route, $trafficInfo);
        if ($alt3) $alternatives[] = $alt3;

        return $alternatives;
    }

    protected function changeTransportMode(Route $route, $trafficInfo)
    {
        $newRoute = clone $route;
        $segments = $newRoute->segments;

        foreach ($segments as &$segment) {
            if ($this->isSegmentCongested($segment, $trafficInfo)) {
                $segment['transport_mode'] = $this->suggestAlternativeMode($segment['transport_mode']);
            }
        }

        $newRoute->segments = $segments;
        return $newRoute;
    }

    protected function avoidCongestedAreas(Route $route, $trafficInfo)
    {
        $newRoute = clone $route;
        $waypoints = $newRoute->waypoints ?? [];

        // Simplified logic to avoid congested areas
        $congestedAreas = $this->getCongestedAreas($trafficInfo);
        $newWaypoints = array_filter($waypoints, function($waypoint) use ($congestedAreas) {
            return !in_array($waypoint, $congestedAreas);
        });

        // Add alternative waypoints to bypass congested areas
        foreach ($congestedAreas as $area) {
            $newWaypoints[] = $this->findAlternativeWaypoint($area);
        }

        $newRoute->waypoints = $newWaypoints;
        return $newRoute;
    }

    protected function useSustainableTransport(Route $route, $trafficInfo)
    {
        $newRoute = clone $route;
        $segments = $newRoute->segments;

        foreach ($segments as &$segment) {
            if ($this->canUseSustainableMode($segment)) {
                $segment['transport_mode'] = $this->suggestSustainableMode($segment['transport_mode']);
            }
        }

        $newRoute->segments = $segments;
        return $newRoute;
    }

    protected function selectBestRoute($alternativeRoutes)
    {
        usort($alternativeRoutes, function($a, $b) {
            $scoreA = $this->calculateRouteScore($a);
            $scoreB = $this->calculateRouteScore($b);
            return $scoreB <=> $scoreA;
        });

        return $alternativeRoutes[0];
    }

    protected function calculateRouteScore(Route $route)
    {
        $score = 0;
        $score += $this->getTimeScore($route);
        $score += $this->getDistanceScore($route);
        $score += $this->getSustainabilityScore($route);
        return $score;
    }

    protected function getTimeScore(Route $route)
    {
        // Implementation depends on how time is stored in the Route model
        return 100 - ($route->estimated_time / 60); // Assuming estimated_time is in minutes
    }

    protected function getDistanceScore(Route $route)
    {
        // Implementation depends on how distance is stored in the Route model
        return 100 - ($route->distance / 1000); // Assuming distance is in meters
    }

    protected function getSustainabilityScore(Route $route)
    {
        $score = 0;
        foreach ($route->segments as $segment) {
            switch ($segment['transport_mode']) {
                case 'walking':
                case 'bicycle':
                    $score += 20;
                    break;
                case 'public_transport':
                    $score += 15;
                    break;
                case 'motorcycle':
                    $score += 10;
                    break;
                case 'car':
                    $score += 5;
                    break;
            }
        }
        return $score;
    }

    protected function isSegmentCongested($segment, $trafficInfo)
    {
        // Simplified logic. In a real scenario, this would involve more complex calculations
        $segmentLocation = $segment['start_point']; // Or use a midpoint between start and end
        return isset($trafficInfo[$segmentLocation]) && $trafficInfo[$segmentLocation]['congestion_level'] > 7;
    }

    protected function suggestAlternativeMode($currentMode)
    {
        $alternatives = [
            'car' => ['public_transport', 'motorcycle', 'bicycle'],
            'motorcycle' => ['bicycle', 'public_transport'],
            'public_transport' => ['bicycle', 'walking'],
            'bicycle' => ['walking', 'public_transport'],
            'walking' => ['bicycle', 'public_transport']
        ];

        return $alternatives[$currentMode][0] ?? $currentMode;
    }

    protected function getCongestedAreas($trafficInfo)
    {
        return array_keys(array_filter($trafficInfo, function($info) {
            return $info['congestion_level'] > 7;
        }));
    }

    protected function findAlternativeWaypoint($congestedArea)
    {
        // Simplified. In a real scenario, this would use geospatial data to find nearby alternatives
        return $congestedArea . "_alternative";
    }

    protected function canUseSustainableMode($segment)
    {
        // Simplified. In reality, this would consider distance, terrain, weather, etc.
        return $segment['distance'] < 5000; // If less than 5km
    }

    protected function suggestSustainableMode($currentMode)
    {
        $sustainableModes = ['walking', 'bicycle', 'public_transport'];
        return in_array($currentMode, $sustainableModes) ? $currentMode : 'bicycle';
    }
}

class TrafficInfoService
{
    public function getCurrentTrafficInfo(array $locations)
    {
        $trafficInfo = [];

        foreach ($locations as $location) {
            $trafficInfo[$location] = $this->fetchTrafficData($location);
        }

        return $trafficInfo;
    }

    protected function fetchTrafficData($location)
    {
        // In a real scenario, this would interact with a traffic API or database
        // For this example, we'll generate random data
        return [
            'congestion_level' => rand(1, 10),
            'average_speed' => rand(10, 60),
            'incidents' => $this->generateRandomIncidents()
        ];
    }

    protected function generateRandomIncidents()
    {
        $possibleIncidents = ['accident', 'roadwork', 'event', 'weather'];
        $incidents = [];

        if (rand(0, 1)) {
            $incidents[] = $possibleIncidents[array_rand($possibleIncidents)];
        }

        return $incidents;
    }

    public function getScheduledEvents()
    {
        // In a real scenario, this would fetch data from a database
        return [
            [
                'name' => 'Corso de Corsos',
                'location' => 'Avenida Ballivián',
                'start_time' => Carbon::now()->addDays(5),
                'end_time' => Carbon::now()->addDays(5)->addHours(6),
            ],
            [
                'name' => 'Feria de la Alasita',
                'location' => 'Plaza Principal',
                'start_time' => Carbon::now()->addDays(10),
                'end_time' => Carbon::now()->addDays(12),
            ],
        ];
    }

    public function predictTrafficConditions(array $locations, $time)
    {
        $predictedTraffic = [];

        foreach ($locations as $location) {
            $currentTraffic = $this->fetchTrafficData($location);
            $historicalData = $this->getHistoricalTrafficData($location, $time);
            $events = $this->getRelevantEvents($location, $time);

            $predictedTraffic[$location] = $this->calculatePrediction($currentTraffic, $historicalData, $events);
        }

        return $predictedTraffic;
    }

    protected function getHistoricalTrafficData($location, $time)
    {
        // In a real scenario, this would fetch historical data from a database
        // For this example, we'll return dummy data
        return [
            'average_congestion' => rand(1, 10),
            'average_speed' => rand(10, 60),
        ];
    }

    protected function getRelevantEvents($location, $time)
    {
        $allEvents = $this->getScheduledEvents();
        return array_filter($allEvents, function($event) use ($location, $time) {
            return $event['location'] == $location && 
                   $time->between($event['start_time'], $event['end_time']);
        });
    }

    protected function calculatePrediction($currentTraffic, $historicalData, $events)
    {
        $prediction = $historicalData;

        // Adjust based on current traffic
        $prediction['congestion_level'] = ($currentTraffic['congestion_level'] + $historicalData['average_congestion']) / 2;
        $prediction['average_speed'] = ($currentTraffic['average_speed'] + $historicalData['average_speed']) / 2;

        // Adjust for events
        if (!empty($events)) {
            $prediction['congestion_level'] += 2; // Increase congestion for events
            $prediction['average_speed'] -= 10; // Decrease speed for events
        }

        // Ensure values are within acceptable ranges
        $prediction['congestion_level'] = max(1, min(10, $prediction['congestion_level']));
        $prediction['average_speed'] = max(5, min(80, $prediction['average_speed']));

        return $prediction;
    }

    public function notifyAffectedUsers(TrafficInfo $trafficInfo)
    {
        $affectedUsers = $this->findAffectedUsers($trafficInfo);

        foreach ($affectedUsers as $user) {
            $user->notify(new TrafficAlertNotification($trafficInfo));
        }
    }

    protected function findAffectedUsers(TrafficInfo $trafficInfo)
    {
        return User::whereHas('routes', function ($query) use ($trafficInfo) {
            $query->where('start_point', 'like', "%{$trafficInfo->location}%")
                ->orWhere('end_point', 'like', "%{$trafficInfo->location}%")
                ->orWhereJsonContains('waypoints', $trafficInfo->location);
        })->get();
    }
}
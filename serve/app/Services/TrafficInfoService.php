<?php

namespace App\Services;

use App\Models\TrafficInfo;
use App\Models\User;
use App\Notifications\TrafficAlertNotification;

class TrafficInfoService
{
    public function getCurrentTrafficInfo(array $locations)
    {
        return TrafficInfo::whereIn('location', $locations)
            ->where('end_time', '>', now())
            ->get();
    }

    public function predictTrafficConditions(array $locations, $time)
    {
        // Implementación simplificada de predicción de tráfico
        // En un escenario real, esto podría involucrar análisis de datos históricos
        // y modelos de aprendizaje automático
        return $this->getCurrentTrafficInfo($locations);
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
        // Implementación simplificada. En un escenario real, esto implicaría
        // un análisis más complejo de las rutas de los usuarios.
        return User::whereHas('routes', function ($query) use ($trafficInfo) {
            $query->where('start_point', 'like', "%{$trafficInfo->location}%")
                ->orWhere('end_point', 'like', "%{$trafficInfo->location}%")
                ->orWhereJsonContains('waypoints', $trafficInfo->location);
        })->get();
    }
}
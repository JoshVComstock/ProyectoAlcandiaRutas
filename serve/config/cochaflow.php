<?php

return [
    'default_transport_modes' => [
        'walking',
        'bicycle',
        'motorcycle',
        'car',
        'micro',
        'trufi',
    ],
    'traffic_update_interval' => 5, // minutos
    'max_alternative_routes' => 3,

    'api' => [
    'throttle' => [
        'driver' => 'cache',
        'decay_minutes' => 1,
        'attempts' => 60,
    ],
],
];

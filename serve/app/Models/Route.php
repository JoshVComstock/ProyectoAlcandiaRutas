<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $fillable = [
        'user_id', 'name', 'start_point', 'end_point', 'waypoints',
        'total_distance', 'estimated_time'
    ];

    protected $casts = [
        'waypoints' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transportModes()
    {
        return $this->belongsToMany(TransportMode::class, 'route_transport_mode')
            ->withPivot('segment_start', 'segment_end');
    }
}
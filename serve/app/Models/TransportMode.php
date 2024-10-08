<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportMode extends Model
{
    protected $fillable = [
        'name', 'icon', 'carbon_footprint'
    ];

    public function routes()
    {
        return $this->belongsToMany(Route::class, 'route_transport_mode')
            ->withPivot('segment_start', 'segment_end');
    }
}
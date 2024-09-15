<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeatmapPattern extends Model
{
    protected $fillable = ['route_id', 'location', 'intensidad'];

    protected $casts = [
        'location' => 'array',
    ];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}
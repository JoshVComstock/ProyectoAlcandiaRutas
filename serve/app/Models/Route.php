<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $fillable = [
        'user_id', 'start_location', 'end_location', 'start_time', 'end_time',
        'transport_mode_id', 'distancia_recorrida', 'tiempo_total', 'velocidad_promedio'
    ];

    protected $casts = [
        'start_location' => 'array',
        'end_location' => 'array',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transportMode()
    {
        return $this->belongsTo(TransportMode::class);
    }

    public function heatmapPatterns()
    {
        return $this->hasMany(HeatmapPattern::class);
    }
}
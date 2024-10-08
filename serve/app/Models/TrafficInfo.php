<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrafficInfo extends Model
{
    protected $fillable = [
        'location', 'description', 'severity', 'start_time', 'end_time'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];
}
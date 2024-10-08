<?php
// app/Models/Route.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $fillable = [
        'user_id',
        'start_point',
        'end_point',
        'path_points',
        'transport_mode',
        'start_time',
        'end_time',
        'total_distance',
        'is_active'
    ];

    protected $casts = [
        'start_point' => 'array',
        'end_point' => 'array',
        'path_points' => 'array',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

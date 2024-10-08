<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PublicTransport extends Model
{
    protected $fillable = ['name', 'type', 'route', 'schedule'];

    protected $casts = [
        'route' => 'array',
        'schedule' => 'array',
    ];
}
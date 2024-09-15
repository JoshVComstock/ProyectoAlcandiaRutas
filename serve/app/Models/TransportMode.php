<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportMode extends Model
{
    protected $fillable = ['nombre'];

    public function routes()
    {
        return $this->hasMany(Route::class);
    }
}
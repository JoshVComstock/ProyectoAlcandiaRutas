<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'nombre', 'email', 'password', 'tipo_usuario',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function routes()
    {
        return $this->hasMany(Route::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
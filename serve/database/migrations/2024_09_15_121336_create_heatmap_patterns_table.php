<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('heatmap_patterns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained('routes');
            $table->point('location');
            $table->float('intensidad');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('heatmap_patterns');
    }
};
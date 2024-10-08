<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('route_transport_mode', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained()->onDelete('cascade');
            $table->foreignId('transport_mode_id')->constrained()->onDelete('cascade');
            $table->string('segment_start');
            $table->string('segment_end');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('route_transport_mode');
    }
};
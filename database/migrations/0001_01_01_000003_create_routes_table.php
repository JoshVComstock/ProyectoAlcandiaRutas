<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoutesTable extends Migration
{
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('start_point');
            $table->json('end_point')->nullable();
            $table->json('path_points')->nullable();
            $table->string('transport_mode');
            $table->datetime('start_time');
            $table->datetime('end_time')->nullable();
            $table->float('total_distance')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('routes');
    }
}
    
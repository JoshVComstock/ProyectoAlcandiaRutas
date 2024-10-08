<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('traffic_info', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->text('description');
            $table->enum('severity', ['low', 'medium', 'high']);
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('traffic_info');
    }
};

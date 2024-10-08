<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('public_transports', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['micro', 'trufi']);
            $table->json('route');
            $table->json('schedule');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('public_transports');
    }
};
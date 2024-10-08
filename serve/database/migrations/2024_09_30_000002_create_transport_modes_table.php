<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('transport_modes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon');
            $table->float('carbon_footprint');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transport_modes');
    }
};
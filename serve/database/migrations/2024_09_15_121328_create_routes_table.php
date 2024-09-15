
<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->point('start_location');
            $table->point('end_location');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->foreignId('transport_mode_id')->constrained('transport_modes');
            $table->float('distancia_recorrida');
            $table->integer('tiempo_total');
            $table->float('velocidad_promedio');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('routes');
    }
};
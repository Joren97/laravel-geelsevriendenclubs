<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('homeTeamId');
            $table->foreignId('outTeamId');
            $table->integer('homeTeamScore')->nullable()->default(null);
            $table->integer('outTeamScore')->nullable()->default(null);
            $table->dateTime('dateTime');
            $table->boolean('isCup')->default(false);
            $table->boolean('isCancelled')->default(false);
            $table->timestamps();

            $table->foreign('homeTeamId')->references('id')->on('teams')->onDelete('cascade');
            $table->foreign('outTeamId')->references('id')->on('teams')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}

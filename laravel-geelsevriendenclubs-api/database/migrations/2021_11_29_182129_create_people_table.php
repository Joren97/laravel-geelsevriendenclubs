<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
                $table->foreignId('team_id')->nullable();
                $table->string('firstName')->nullable();
                $table->string('lastName')->nullable();
                $table->string('address')->nullable();
                $table->string('postalCode')->nullable();
                $table->string('city')->nullable();
                $table->string('email')->nullable();
                $table->string('tel')->nullable();
                $table->dateTime('birthDate')->nullable();
                $table->integer('playerNumber')->nullable();
                $table->timestamps();

                $table->foreign('team_id')->references('id')->on('teams')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
}

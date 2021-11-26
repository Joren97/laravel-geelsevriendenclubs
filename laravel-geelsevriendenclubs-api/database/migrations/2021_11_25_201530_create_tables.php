<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Team;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        try {
            Schema::create('teams', function(Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('address')->nullable();
                $table->string('postalCode')->nullable();;
                $table->string('city')->nullable();;
                $table->string('color1')->nullable();;
                $table->string('color2')->nullable();;
                $table->string('color3')->nullable();;
                $table->integer('balance')->default(0);
                $table->timestamps();
            });

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
    
            Schema::create('persons', function(Blueprint $table) {
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
    
            
        } catch (\Throwable $th) {
            throw $th;
        }

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('persons');
        Schema::dropIfExists('teamInGames');
        Schema::dropIfExists('games');
        Schema::dropIfExists('teams');
    }
}

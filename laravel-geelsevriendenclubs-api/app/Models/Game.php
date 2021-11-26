<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public function homeTeam(){
        return $this->belongsTo(Team::class, "homeTeamId", "id");
    }

    public function outTeam(){
        return $this->belongsTo(Team::class, "outTeamId", "id");
    }

    // /**
    //  * The attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected $fillable = [
    //     "homeTeamId",
    //     "outTeamId",
    //     "homeTeamScore" => null,
    //     "outTeamScore" => null,
    //     "dateTime",
    //     "isCup" => false,
    //     "isCancelled" => false
    // ];
}

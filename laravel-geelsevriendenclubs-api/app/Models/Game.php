<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    public function homeTeam(){
        return $this->belongsTo(Team::class, "homeTeamId", "id");
    }

    public function outTeam(){
        return $this->belongsTo(Team::class, "outTeamId", "id");
    }
}

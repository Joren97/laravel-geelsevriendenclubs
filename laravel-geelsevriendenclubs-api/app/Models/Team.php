<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    public function outGames(){
        return $this->hasMany(Game::class, 'outTeamId', 'id');
    }
 
    public function homeGames(){
     return $this->hasMany(Game::class, 'homeTeamId', 'id');
    }
}

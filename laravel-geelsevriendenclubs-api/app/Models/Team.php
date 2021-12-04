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

    public function people(){
        return $this->hasMany(Person::class, 'team_id', 'id');
    }

    protected $fillable = [
        'name',
        'address',
        'postalCode',
        'city',
        'color1',
        'color2',
        'color3',
        'color1Hex',
        'color2Hex',
        'color3Hex',
        'icon',
    ];
}

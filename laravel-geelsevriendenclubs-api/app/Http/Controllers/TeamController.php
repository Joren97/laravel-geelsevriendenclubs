<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getAll', 'get', 'scoreBoard']]);
    }

    public function getAll(Request $request)
    {
        return response()->json(Team::with(['homeGames', 'outGames'])->paginate());
    }

    public function get($id)
    {
        return response()->json(Team::find($id));
    }

    public function create(Request $request)
    {
        $author = Team::create($request->all());

        return response()->json($author, 201);
    }

    public function update($id, Request $request)
    {
        $author = Team::findOrFail($id);
        $author->update($request->all());

        return response()->json($author, 200);
    }

    public function delete($id)
    {
        Team::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

    public function scoreBoard(Request $request)
    {
        $isSmall = $request->get('isSmall', false);

        $teams = Team::with(['homeGames', 'outGames'])->get();

        $arr = [];

        foreach ($teams as $team) {
            $obj = (object)[];

            $homeGames = $team->homeGames->filter(function ($value, $key) {
                return $value->dateTime < date("Y-m-d") && $value->isCancelled == false && !is_null($value->homeTeamScore) && !is_null($value->outTeamScore) && !$value->isCup;
            });

            $outGames = $team->outGames->filter(function ($value, $key) {
                return $value->dateTime < date("Y-m-d") && $value->isCancelled == false && !is_null($value->homeTeamScore) && !is_null($value->outTeamScore) && !$value->isCup;
            });

            $homeGamesWon = $homeGames->filter(function ($value, $key) {
                return $value->homeTeamScore > $value->outTeamScore;
            });

            $outGamesWon = $outGames->filter(function ($value, $key) {
                return $value->homeTeamScore < $value->outTeamScore;
            });

            $homeGamesLost = $homeGames->filter(function ($value, $key) {
                return $value->homeTeamScore < $value->outTeamScore;
            });

            $outGamesLost = $outGames->filter(function ($value, $key) {
                return $value->homeTeamScore > $value->outTeamScore;
            });

            $homeGamesTied = $homeGames->filter(function ($value, $key) {
                return $value->homeTeamScore == $value->outTeamScore;
            });

            $outGamesTied = $outGames->filter(function ($value, $key) {
                return $value->homeTeamScore == $value->outTeamScore;
            });

            $homeGoalsReceived = $homeGames->reduce(function ($carry, $item) {
                return $carry + $item->outTeamScore;
            });

            $outGoalsReceived = $outGames->reduce(function ($carry, $item) {
                return $carry + $item->homeTeamScore;
            });

            $homeGoalsScored = $homeGames->reduce(function ($carry, $item) {
                return $carry + $item->homeTeamScore;
            });

            $outGoalsScored = $outGames->reduce(function ($carry, $item) {
                return $carry + $item->outTeamScore;
            });

            $obj->team = $team;
            $obj->gamesPlayed = count($homeGames) + count($outGames);
            $obj->gamesWon = count($homeGamesWon) + count($outGamesWon);
            $obj->gamesLost = count($homeGamesLost) + count($outGamesLost);
            $obj->gamesTied = count($homeGamesTied) + count($outGamesTied);
            $obj->goalsReceived = $homeGoalsReceived + $outGoalsReceived;
            $obj->goalsScored = $homeGoalsScored + $outGoalsScored;
            $obj->points = (count($homeGamesWon) * 3) + (count($outGamesWon) * 3) + (count($homeGamesTied)) + (count($outGamesTied));
            array_push($arr, $obj);
        }

        usort($arr, function($a, $b) {return $a->points < $b->points; });

        if ($isSmall === true || $isSmall == "true") {
            return response()->json(array_slice($arr, 0, 5));
        }

        return response()->json($arr);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    
    public function getAll(Request $request)
    {
        $from = date($request->get("from"));
        $till = date($request->get("till"));

        return response()->json(Game::where('dateTime', '>', $from)
        ->where('dateTime', '<', $till)
        ->with(['homeTeam', 'outTeam'])
        ->paginate());
    }

    public function get($id)
    {
        return response()->json(Game::find($id));
    }

    public function create(Request $request)
    {
        $author = Game::create($request->all());

        return response()->json($author, 201);
    }

    public function update($id, Request $request)
    {
        $author = Game::findOrFail($id);
        $author->update($request->all());

        return response()->json($author, 200);
    }

    public function delete($id)
    {
        Game::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
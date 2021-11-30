<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

function IsNullOrEmptyString($str)
{
    return (!isset($str) || trim($str) === '');
}

class GameController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getAll', 'get']]);
    }

    public function getAll(Request $request)
    {
        $from = date($request->get("from"));
        $till = date($request->get("till"));

        $conditions = [];

        if (!IsNullOrEmptyString($from)) {
            array_push($conditions, ['dateTime', '>', $from]);
        }

        if (!IsNullOrEmptyString($till)) {
            array_push($conditions, ['dateTime', '<', $till]);
        }

        return response()->json(Game::where($conditions)
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

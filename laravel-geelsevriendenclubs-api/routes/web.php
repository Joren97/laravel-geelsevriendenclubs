<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    
    /**
     * Teams
     */
    $router->get('teams',  ['uses' => 'TeamController@getAll']);

    $router->get('teams/{id}', ['uses' => 'TeamController@get']);

    $router->post('teams', ['uses' => 'TeamController@create']);

    $router->delete('teams/{id}', ['uses' => 'TeamController@delete']);

    $router->put('teams/{id}', ['uses' => 'TeamController@update']);

    /**
     * Games
     */
    $router->get('games',  ['uses' => 'GameController@getAll']);

    $router->get('games/{id}', ['uses' => 'GameController@get']);

    $router->post('games', ['uses' => 'GameController@create']);

    $router->delete('games/{id}', ['uses' => 'GameController@delete']);

    $router->put('games/{id}', ['uses' => 'GameController@update']);

    /**
     * Misc
     */
    $router->get('scoreboard', ['uses' => 'TeamController@scoreboard']);
});

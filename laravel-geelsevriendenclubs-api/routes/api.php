<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);   
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'game'

], function ($router) {
    Route::get('/', [GameController::class, 'getAll']);
    Route::get('/{id}', [GameController::class, 'get']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'game'

], function ($router) {
    Route::get('/', [GameController::class, 'getAll']);
    Route::get('/{id}', [GameController::class, 'get']);
});
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpreendimentoController;
use App\Http\Controllers\ReservaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/empreendimentos', [EmpreendimentoController::class, 'index']);

Route::get('/reservas', [ReservaController::class, 'index']);
Route::post('/reservas', [ReservaController::class, 'store']);
Route::delete('/reservas/{id}', [ReservaController::class, 'destroy']);

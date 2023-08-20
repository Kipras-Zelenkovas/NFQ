<?php

use App\Http\Controllers\Specialist\Auth;
use App\Http\Controllers\User\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::prefix('specialist')->group(function () {
    Route::get('', [Reservation::class, 'getReservations'])->middleware('auth:sanctum')->name('reservations');
    Route::post('login', [Auth::class, 'login'])->middleware('guest')->name('login');
    Route::post('logout', [Auth::class, 'logout'])->middleware('auth:sanctum')->name('logout');
});


Route::prefix('reservation')->group(function () {
    Route::get('', [Reservation::class, 'getUpcoming'])->middleware('guest')->name('reservations.upcoming');
    Route::post('', [Reservation::class, 'reserve'])->middleware('guest')->name('reservation.reserve');
    Route::delete('', [Reservation::class, 'cancel'])->middleware('guest')->name('reservation.cancel');
    Route::put('', [Reservation::class, 'start'])->middleware('auth:sanctum')->name('reservation.start');
});

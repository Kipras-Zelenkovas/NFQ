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
    Route::post('login', [Auth::class, 'login'])->middleware('guest')->name('login');
    Route::post('logout', [Auth::class, 'logout'])->middleware('auth:sanctum')->name('logout');


    Route::get('test', function (Request $request) {
        $res = User::find($request->user()->id);
        return response()->json([
            'data'  => $res->reservations,
        ]);
    })->middleware('auth:sanctum')->name('test');
});


Route::prefix('user')->group(function () {
    Route::post('reserve', [Reservation::class, 'reserve'])->middleware('guest')->name('user.reserve');
    Route::post('cancel', [Reservation::class, 'cancel'])->middleware('guest')->name('user.cancel');
    Route::get('check', [Reservation::class, 'check'])->middleware('guest')->name('user.check');
});

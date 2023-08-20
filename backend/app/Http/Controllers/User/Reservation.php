<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Reservations;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class Reservation extends Controller
{

    public function reserve(Request $request)
    {
        try {
            $specialist = User::inRandomOrder()->first();

            $reservation = Reservations::create([
                'code'          => Str::random(5),
                'specialist_id' => $specialist->id,
            ]);

            $reservation->save();

            return response()->json([
                'status'    => true,
                'code'      => $reservation->code,
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }
}

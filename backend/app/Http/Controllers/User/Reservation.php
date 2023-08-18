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
            $latestReservation = $specialist->latest_reservation;
            $aproxTime = "";

            if (!$latestReservation) {
                $aproxTime = date("H:i", strtotime("now"));
            } else {
                $aproxTime = date("H:i", strtotime($latestReservation->aprox_time . '+15 minutes'));
            }

            $reservation = Reservations::create([
                'aprox_time'    => $aproxTime,
                'code'          => Str::random(5),
                'specialist_id' => $specialist->id,
            ]);

            $reservation->save();

            return response()->json([
                'status'    => true,
                'code'      => $reservation->code,
            ]);
            return response()->json($aproxTime);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }
}

<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Reservations;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class Reservation extends Controller
{

    public function reserve()
    {
        try {
            $specialist = User::inRandomOrder()->first();

            $reservation = Reservations::create([
                'code'          => Str::random(5),
                'specialist_id' => $specialist->id,
                'status'    => 'aranged'
            ]);

            $reservation->save();

            return response()->json([
                'status'        => true,
                'code'          => $reservation->code,
                'specialist'    => $specialist->id
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    public function cancel(Request $request)
    {
        try {
            $request->validate([
                'code'  => 'required|string|min:5|max:5'
            ]);

            Reservations::where('code', $request->code)->delete();

            return response()->json([
                'status'    => true,
                'message'   => 'Reservation successfully canceled'
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    public function start(Request $request)
    {
        try {
            $request->validate([
                'code'  => 'required|string|min:5|max:5'
            ]);

            Reservations::where('code', $request->code)->update(['status' => 'started']);

            return response()->json([
                'status'    => true,
                'message'   => 'Session successfully started'
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    public function getUpcoming(Request $request)
    {
        try {
            $request->validate([
                'specialist'    => 'required|max:10'
            ]);

            $reservations = User::find($request->specialist)->reservations->take(8);

            return response()->json([
                'status'    => true,
                'data'      => $reservations
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    public function getReservations(Request $request)
    {
        try {
            $reservations = User::find($request->user()->id)->reservations;

            return response()->json([
                'status'    => true,
                'data'      => $reservations
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }
}

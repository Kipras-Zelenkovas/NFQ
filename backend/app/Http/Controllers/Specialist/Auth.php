<?php

namespace App\Http\Controllers\Specialist;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Hash;

class Auth extends Controller
{

    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email'     => 'required|email|max:40',
                'password'  => 'required|min:8|max:30'
            ]);

            $user = User::where('email', $validated['email'])->first();

            if (!$user || !Hash::check($validated['password'], $user->password)) {
                return response()->json([
                    'status'    => false,
                    'message'   => 'Invalid credentials'
                ]);
            }

            $token = $user->createToken("API_TOKEN" . rand(1569, 945214))->plainTextToken;

            return response()->json([
                'status'    => true,
                'token' => $token,
                'message'   => 'Successful login'
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    public function logout(Request $request)
    {
        try {

            $request->user()->tokens()->delete();

            return response()->json([
                'status'    => true,
                'message'   => 'Successful logout'
            ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }
}

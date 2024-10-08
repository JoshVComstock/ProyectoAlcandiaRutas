<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('Received registration request', $request->all());

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]); 

        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('User registered successfully', ['user_id' => $user->id]);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($validatedData)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $user = User::where('email', $validatedData['email'])->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {

    }

    public function signup (SignupRequest $signupRequest){
        $data = $signupRequest->validated();

        /** @var User $user */
        $user = User::create ([
            'first_name'=> $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),

        ]);
        $token = $user->createToken('main')->plainTextToken;

        // Will be the data response
            return response([
                'user' => $user,
                'token' => $token
            ]);
    }

    public function login(LoginRequest $request){

        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided email or password incorrect'
            ],422);
        }

        /** @var User $user */
        $user = User::whereEmail($request->email)->first();
       // $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        // Will be the data response
        return response(compact('user','token'));

    }

    public function logout(Request $request){
        /** @var User $user */

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     * NOT USED
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next) {
//        $response = $next($request);
//        Log::error('Request' . $request);
////        $request->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
////        $request->headers->set('Access-Control-Allow-Methods', 'POST, GET');
////        $request->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application', 'ip');
////        Log::info("Re" . $request);

        return $next($request);
    }
}

<?php

use App\Http\Controllers\Api\V1\Auth\AuthenticatedUserController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use App\Http\Controllers\Api\V1\Auth\VerifyEmailController;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Support\Facades\Route;
use Illuminate\Session\Middleware\StartSession;

$sessionMiddleware = [
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
];

Route::prefix('v1')->group(function () use ($sessionMiddleware): void {
    Route::get('/health', function (): array {
        return [
            'status' => 'ok',
            'service' => 'api',
        ];
    });

    Route::middleware($sessionMiddleware)->prefix('auth')->group(function (): void {
        Route::post('/register', RegisterController::class);
        Route::post('/login', LoginController::class);
        Route::post('/verify-email', VerifyEmailController::class);
        Route::get('/me', AuthenticatedUserController::class);
    });
});

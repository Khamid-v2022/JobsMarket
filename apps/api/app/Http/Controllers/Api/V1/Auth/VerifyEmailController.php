<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyEmailRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class VerifyEmailController extends Controller
{
    private const STATIC_VERIFICATION_CODE = '1111';

    public function __invoke(VerifyEmailRequest $request): JsonResponse
    {
        $user = $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        if ($request->string('code')->toString() !== self::STATIC_VERIFICATION_CODE) {
            throw ValidationException::withMessages([
                'code' => ['The provided verification code is invalid.'],
            ]);
        }

        if ($user->email_verified_at === null) {
            $user->forceFill([
                'email_verified_at' => now(),
            ])->save();
        }

        return response()->json([
            'message' => 'Email verified.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at?->toAtomString(),
            ],
        ]);
    }
}
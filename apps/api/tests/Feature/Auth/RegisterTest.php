<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_with_valid_payload(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Alex Kim',
            'email' => 'alex@example.com',
            'password' => 'secret1234',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Registered.')
            ->assertJsonPath('user.email', 'alex@example.com')
            ->assertJsonPath('verification.required', true);

        $user = User::query()->where('email', 'alex@example.com')->first();

        $this->assertNotNull($user);
        $this->assertNull($user?->email_verified_at);
        $this->assertAuthenticatedAs($user);
    }

    public function test_register_fails_for_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'alex@example.com',
        ]);

        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Alex Kim',
            'email' => 'alex@example.com',
            'password' => 'secret1234',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_authenticated_user_can_verify_email_with_static_code(): void
    {
        $user = User::factory()->unverified()->create();

        $this->actingAs($user);

        $response = $this->postJson('/api/v1/auth/verify-email', [
            'code' => '1111',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Email verified.');

        $user->refresh();

        $this->assertNotNull($user->email_verified_at);
    }

    public function test_verify_email_returns_validation_error_for_invalid_code(): void
    {
        $user = User::factory()->unverified()->create();

        $this->actingAs($user);

        $response = $this->postJson('/api/v1/auth/verify-email', [
            'code' => '0000',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['code']);

        $user->refresh();

        $this->assertNull($user->email_verified_at);
    }

    public function test_verify_email_requires_authenticated_session(): void
    {
        $this->postJson('/api/v1/auth/verify-email', [
            'code' => '1111',
        ])
            ->assertStatus(401)
            ->assertJsonPath('message', 'Unauthenticated.');
    }
}
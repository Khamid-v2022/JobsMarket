<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_log_in_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'alex@example.com',
            'password' => 'secret1234',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'alex@example.com',
            'password' => 'secret1234',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Authenticated.')
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', $user->email);

        $this->assertAuthenticatedAs($user);
    }

    public function test_login_returns_validation_error_for_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'alex@example.com',
            'password' => 'secret1234',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'alex@example.com',
            'password' => 'wrong-password',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

        $this->assertGuest();
    }

    public function test_authenticated_user_endpoint_returns_the_signed_in_user(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $this->getJson('/api/v1/auth/me')
            ->assertOk()
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', $user->email);
    }
}
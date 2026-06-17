<?php

namespace Database\Factories;

use App\Models\Reserva;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reserva>
 */
class ReservaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unidade_id' => \App\Models\Unidade::factory(),
            'cliente_nome' => fake()->name(),
            'cliente_email' => fake()->unique()->safeEmail(),
            'data_reserva' => now(),
        ];
    }
}

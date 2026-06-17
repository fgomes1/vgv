<?php

namespace Database\Factories;

use App\Models\Unidade;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Unidade>
 */
class UnidadeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'empreendimento_id' => \App\Models\Empreendimento::factory(),
            'numero' => fake()->buildingNumber(),
            'status' => 'disponivel',
        ];
    }
}

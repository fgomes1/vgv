<?php

namespace Database\Factories;

use App\Models\Empreendimento;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Empreendimento>
 */
class EmpreendimentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => fake()->company() . ' Residence',
            'cidade' => fake()->city(),
        ];
    }
}

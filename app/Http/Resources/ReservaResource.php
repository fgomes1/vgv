<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cliente_nome' => $this->cliente_nome,
            'cliente_email' => $this->cliente_email,
            'data_reserva' => $this->data_reserva ? $this->data_reserva->toIso8601String() : $this->created_at->toIso8601String(),
            'unidade' => new UnidadeResource($this->whenLoaded('unidade')),
        ];
    }
}

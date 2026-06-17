<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    /** @use HasFactory<\Database\Factories\UnidadeFactory> */
    use HasFactory;

    protected $fillable = ['empreendimento_id', 'numero', 'status'];

    public function empreendimento()
    {
        return $this->belongsTo(Empreendimento::class);
    }

    public function reserva()
    {
        return $this->hasOne(Reserva::class);
    }

    public function scopeDisponiveis($query)
    {
        return $query->where('status', 'disponivel');
    }
}

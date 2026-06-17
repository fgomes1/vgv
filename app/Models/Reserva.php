<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = [
        'unidade_id',
        'cliente_nome',
        'cliente_email',
        'data_reserva'
    ];

    protected $casts = [
        'data_reserva' => 'datetime',
    ];

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empreendimento extends Model
{
    /** @use HasFactory<\Database\Factories\EmpreendimentoFactory> */
    use HasFactory;

    protected $fillable = ['nome', 'cidade'];

    public function unidades()
    {
        return $this->hasMany(Unidade::class);
    }
}

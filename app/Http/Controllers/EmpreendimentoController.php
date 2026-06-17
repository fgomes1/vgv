<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empreendimento;
use App\Http\Resources\EmpreendimentoResource;
use Illuminate\Support\Facades\Cache;

class EmpreendimentoController extends Controller
{
    public function index()
    {
        $empreendimentos = Cache::remember('empreendimentos_list', 300, function () {
            return Empreendimento::with('unidades')->get();
        });

        return EmpreendimentoResource::collection($empreendimentos);
    }
}

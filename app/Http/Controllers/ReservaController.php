<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reserva;
use App\Models\Unidade;
use App\Http\Requests\StoreReservaRequest;
use App\Http\Resources\ReservaResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class ReservaController extends Controller
{
    public function index()
    {
        $reservas = Reserva::with(['unidade.empreendimento'])->latest()->get();
        return ReservaResource::collection($reservas);
    }

    public function store(StoreReservaRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $unidade = Unidade::lockForUpdate()->findOrFail($request->unidade_id);

            if ($unidade->status !== 'disponivel') {
                return response()->json(['message' => 'Unidade não está mais disponível.'], 409);
            }

            $reserva = Reserva::create($request->validated());
            $unidade->update(['status' => 'reservado']);

            Cache::forget('empreendimentos_list');

            $reserva->refresh();
            $reserva->load('unidade.empreendimento');

            return new ReservaResource($reserva);
        });
    }

    public function destroy($id)
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json(['message' => 'Reserva não encontrada ou já cancelada.'], 404);
        }

        DB::transaction(function () use ($reserva) {
            $unidade = $reserva->unidade;
            $reserva->delete();
            $unidade->update(['status' => 'disponivel']);
            
            Cache::forget('empreendimentos_list');
        });

        return response()->json(null, 204);
    }
}

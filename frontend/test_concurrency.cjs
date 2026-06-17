const axios = require('axios');

async function testConcurrency() {
    console.log("🔍 Buscando uma unidade disponível...");
    const res = await axios.get('http://localhost/api/empreendimentos');
    const empreendimento = res.data.data.find(e => e.unidades.length > 0);
    
    if (!empreendimento) {
        console.log("❌ Nenhuma unidade disponível. Por favor, libere ou crie uma unidade primeiro.");
        return;
    }
    const unidadeId = empreendimento.unidades[0].id;

    console.log(`👤 Disparando 2 requisições SIMULTÂNEAS para reservar a Unidade ${unidadeId}...`);

    const p1 = axios.post('http://localhost/api/reservas', {
        unidade_id: unidadeId,
        cliente_nome: "João Silva",
        cliente_email: "joao@teste.com"
    });

    const p2 = axios.post('http://localhost/api/reservas', {
        unidade_id: unidadeId,
        cliente_nome: "Maria Oliveira",
        cliente_email: "maria@teste.com"
    });

    const results = await Promise.allSettled([p1, p2]);

    console.log("\n--- RESULTADO DA CONCORRÊNCIA ---");
    results.forEach((r, i) => {
        const cliente = i === 0 ? "João Silva" : "Maria Oliveira";
        if (r.status === "fulfilled") {
            console.log(`✅ [SUCESSO] ${cliente} conseguiu fazer a reserva! (Status: ${r.value.status})`);
        } else {
            console.log(`🚫 [BLOQUEADO] ${cliente} foi barrado pelo sistema de Double-Booking! (Status: ${r.reason.response?.status} Conflict)`);
        }
    });
}

testConcurrency();

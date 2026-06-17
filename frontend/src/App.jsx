import React, { useEffect, useState } from 'react';
import api from './api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

function App() {
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchEmpreendimentos();
  }, []);

  const fetchEmpreendimentos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/empreendimentos');
      setEmpreendimentos(response.data.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar os empreendimentos. O backend está rodando?');
    } finally {
      setLoading(false);
    }
  };

  const handleReserva = async (unidadeId) => {
    try {
      const payload = {
        unidade_id: unidadeId,
        cliente_nome: "Cliente " + Math.floor(Math.random() * 1000),
        cliente_email: `cliente${Math.floor(Math.random() * 1000)}@luxurystate.com`
      };
      
      await api.post('/reservas', payload);
      setMessage({ type: 'success', text: 'Reserva efetuada com sucesso e atrelada ao seu Cliente!' });
      
      fetchEmpreendimentos();
      
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setMessage({ type: 'error', text: 'Desculpe, esta unidade acabou de ser reservada por outro cliente!' });
      } else {
        setMessage({ type: 'error', text: 'Ocorreu um erro ao tentar reservar.' });
      }
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 py-12 font-sans text-gray-900">
      
      <div className="container max-w-6xl mx-auto px-4">
        
        <header className="mb-12 text-center md:text-left border-b border-gray-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 mb-2 font-serif">
              VGV <span className="text-primary">Control.</span>
            </h1>
            <p className="text-gray-500 text-lg">Reserva Exclusiva de Imóveis de Alto Padrão</p>
          </div>
          <div className="hidden md:block">
            <Badge variant="outline" className="text-gray-500 border-gray-300 py-1 px-3">
              Sistema de Vendas
            </Badge>
          </div>
        </header>

        {message && (
          <div className={`mb-8 p-4 border-l-4 rounded-none shadow-sm ${message.type === 'success' ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800'}`}>
            <p className="font-semibold">{message.text}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 w-full"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/3"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-white border border-red-200 shadow-sm">
            <h3 className="text-xl text-red-600 font-semibold mb-4">{error}</h3>
            <Button onClick={fetchEmpreendimentos} variant="outline">Tentar Novamente</Button>
          </div>
        ) : empreendimentos.length === 0 ? (
          <div className="text-center p-12 bg-white border border-gray-200 shadow-sm">
            <h3 className="text-xl text-gray-500 font-semibold mb-4">Nenhum empreendimento disponível.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {empreendimentos.map((emp) => (
              <Card key={emp.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="relative h-64 overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80&sig=${emp.id}`} 
                    alt={emp.nome} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    {emp.unidades.length > 0 && emp.unidades[0].tipo === 'casa' ? (
                       <Badge variant="orange" className="uppercase tracking-wider">Casa</Badge>
                    ) : (
                       <Badge variant="blue" className="uppercase tracking-wider">Apartamento</Badge>
                    )}
                  </div>
                </div>
                
                <CardHeader className="bg-white">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight">{emp.nome}</CardTitle>
                  <CardDescription className="text-gray-500 pt-1">
                    {emp.unidades.filter(u => u.status === 'disponivel').length} unidades disponíveis de {emp.unidades.length}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow bg-white">
                  <div className="space-y-4">
                    {emp.unidades.slice(0, 3).map(unidade => {
                      const isAvailable = unidade.status === 'disponivel';
                      return (
                      <div key={unidade.id} className={`flex items-center justify-between p-3 border transition-colors ${isAvailable ? 'border-gray-100 bg-gray-50 hover:bg-gray-100' : 'border-gray-200 bg-gray-100 opacity-60'}`}>
                        <div>
                          <p className="font-semibold text-gray-900">Unidade {unidade.numero}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">{unidade.metragem}m² • {unidade.vagas_garagem} Vagas</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${isAvailable ? 'text-primary' : 'text-gray-500 line-through'}`}>R$ {(unidade.preco / 100).toLocaleString('pt-BR')}</p>
                          <Button 
                            size="sm" 
                            onClick={() => isAvailable && handleReserva(unidade.id)}
                            disabled={!isAvailable}
                            className={`mt-2 w-full uppercase tracking-wider text-xs ${!isAvailable && 'bg-gray-400 cursor-not-allowed'}`}
                          >
                            {isAvailable ? 'Reservar' : 'Indisponível'}
                          </Button>
                        </div>
                      </div>
                    )})}
                    {emp.unidades.length > 3 && (
                      <p className="text-xs text-center text-gray-500 pt-2 font-medium">
                        + {emp.unidades.length - 3} outras unidades...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

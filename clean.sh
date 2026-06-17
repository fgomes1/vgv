#!/bin/bash

echo "Iniciando a limpeza do ambiente VGV Control..."

if [ -f "./vendor/bin/sail" ]; then
    echo "Parando os containers e destruindo os bancos de dados (Volumes)..."
    ./vendor/bin/sail down -v
    echo "Containers e volumes removidos com sucesso!"
else
    echo "Aviso: O Laravel Sail nao foi encontrado. Talvez o projeto ja esteja limpo ou as dependencias nao foram instaladas."
fi

echo "Deseja remover as pastas 'vendor' (PHP) e 'node_modules' (React) para liberar espaco no disco? (s/N)"
read -r resposta
if [[ "$resposta" =~ ^([sS][iI]|[sS])$ ]]; then
    echo "Removendo dependencias..."
    rm -rf vendor
    rm -rf frontend/node_modules
    echo "Pastas removidas!"
fi

echo "Limpeza concluida! O seu computador esta livre dos rastros do projeto."

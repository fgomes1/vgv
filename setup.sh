#!/bin/bash

echo "Iniciando o Setup Automatico do VGV Control..."

# 1. Copia o .env se não existir
if [ ! -f .env ]; then
    echo "Copiando .env.example para .env..."
    cp .env.example .env
fi

# 2. Instala dependências do PHP usando a imagem temporária oficial do Sail
echo "Instalando dependencias do Composer..."
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs

# 3. Sobe os containers (MySQL, Redis, Laravel App)
echo "Subindo os containers Docker..."
./vendor/bin/sail up -d

# Espera os bancos de dados estarem prontos
echo "Aguardando o MySQL inicializar pela primeira vez (Isso pode levar alguns segundos)..."
sleep 20

# 4. Gera chave e roda banco de dados
echo "Gerando Application Key..."
./vendor/bin/sail artisan key:generate

echo "Rodando Migrations e Populando o Banco (Seeders)..."
./vendor/bin/sail artisan migrate:refresh --seed

# 5. Instala dependências do Frontend
echo "Instalando dependencias do React (Frontend)..."
./vendor/bin/sail npm install --prefix frontend

echo "Setup Completo!"
echo "=========================================================="
echo "BACKEND rodando em: http://localhost:8000"
echo "FRONTEND: Abra um segundo terminal e rode: ./vendor/bin/sail npm run dev --prefix frontend -- --host"
echo "=========================================================="

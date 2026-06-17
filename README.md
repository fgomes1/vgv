# Imobiliária VGV - Desafio Técnico

Sistema de reservas para o mercado imobiliário com validação de concorrência (Double-Booking).

## Como Executar o Projeto

Este projeto utiliza **Laravel Sail** (Docker). 

### 1. Setup Expresso (Recomendado)
Para facilitar a avaliação, existe um script que sobe os containers, roda as migrations com seeders e instala o Frontend em 1 único comando.

```bash
# Clone o projeto e entre na pasta
cd vgv

# Rode o instalador automático
bash setup.sh
```

### 2. Setup Manual (Alternativo)
Caso prefira rodar os comandos passo a passo em vez de usar o script automático:
```bash
cp .env.example .env

docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs

./vendor/bin/sail up -d
sleep 15
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate:refresh --seed
./vendor/bin/sail npm install --prefix frontend
```

### 3. Subir o Frontend (React)
O setup anterior já instala as dependências. Agora basta subir o servidor local:
```bash
# Rode o servidor de desenvolvimento via Sail
./vendor/bin/sail npm run dev --prefix frontend -- --host
```
> Acesse a aplicação no navegador em: `http://localhost:5173`

### 4. Testar a API no Insomnia/Postman
Importe o arquivo `postman_collection.json` localizado na raiz do repositório para ter acesso às rotas já configuradas.

---

## Teste de Concorrência (Double-Booking)

Foi desenvolvido um script customizado em Node.js para provar a eficácia do Pessimistic Locking no banco de dados. O script dispara **duas requisições de reserva simultâneas** para a mesma unidade.

**Como testar:**
No seu terminal, na raiz do projeto, rode:
```bash
node frontend/test_concurrency.cjs
```

O sistema fará o processamento, aceitando a primeira requisição (201) e rejeitando a segunda (409 Conflict).



## Limpeza do Ambiente (Tear Down)
Após finalizar a sua avaliação, você pode remover todos os containers, bancos de dados e dependências geradas pelo projeto com um único comando, deixando o seu Docker completamente limpo:

```bash
bash clean.sh
```

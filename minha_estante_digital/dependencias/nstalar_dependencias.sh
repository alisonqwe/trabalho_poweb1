#!/bin/bash

PASTA_PROJETO="$(cd "$(dirname "$0")/.." && pwd)"

mkdir -p "$PASTA_PROJETO/dependencias/bootstrap/css"

curl -L "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" \
-o "$PASTA_PROJETO/dependencias/bootstrap/css/bootstrap.min.css"

echo "Dependências baixadas com sucesso."
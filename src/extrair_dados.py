import pandas as pd
import os
import json

# Caminhos dos arquivos
CSV_PATH = "public/dados.csv"
JSON_PATH = "src/datasets/dados_paraiba.json"

def extrair_dados_csv_para_json():
    if not os.path.exists(CSV_PATH):
        print(f"Arquivo {CSV_PATH} não encontrado.")
        return

    # Lê o arquivo CSV
    df = pd.read_csv(CSV_PATH)

    # Verifica se todas as colunas necessárias estão presentes
    colunas_necessarias = ["Região", "UF", "Cidade", "Macroregião", "Microregião", "Entidade", "Quantidade de Alunos"]
    if not all(col in df.columns for col in colunas_necessarias):
        print("O arquivo CSV não contém todas as colunas esperadas.")
        return

    # Converte o DataFrame para uma lista de dicionários
    dados = df.to_dict(orient="records")

    # Filtra apenas os dados da Paraíba usando filter()
    dados_pb = list(filter(lambda linha: linha["UF"] == "PB", dados))

    # Cria o diretório de destino se não existir
    os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)

    # Salva os dados filtrados em JSON
    with open(JSON_PATH, "w", encoding="utf-8") as json_file:
        json.dump(dados_pb, json_file, ensure_ascii=False, indent=4)

    print(f"Dados da Paraíba extraídos e salvos em: {JSON_PATH}")

# Executa a extração
extrair_dados_csv_para_json()

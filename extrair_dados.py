
import pandas as pd
import os
import json

# Caminhos dos arquivos
CSV_PATH = "public/dados.csv"  # Caminho para o arquivo CSV
JSON_PATH = "src/datasets/dados_paraiba.json"  # Caminho para salvar o JSON extraído

def extrair_dados_csv_para_json():
    # Verifica se o arquivo CSV existe
    if not os.path.exists(CSV_PATH):
        print(f"Arquivo {CSV_PATH} não encontrado.")
        return

    # Lê o arquivo CSV usando pandas
    try:
        df = pd.read_csv(CSV_PATH)
    except Exception as e:
        print(f"Erro ao ler o arquivo CSV: {e}")
        return

    # Verifica se todas as colunas necessárias estão presentes no CSV
    colunas_necessarias = ["NO_MUNICIPIO", "SG_UF", "NO_MESORREGIAO", "NO_MICRORREGIAO", "NO_ENTIDADE", "QT_MAT_BAS", "id"]
    if not all(col in df.columns for col in colunas_necessarias):
        print("O arquivo CSV não contém todas as colunas esperadas.")
        return

    # Converte o DataFrame para uma lista de dicionários (para poder manipular os dados facilmente)
    dados = df.to_dict(orient="records")

    # Filtra os dados para incluir apenas os da Paraíba (SG_UF = "PB")
    dados_pb = [linha for linha in dados if linha["SG_UF"] == "PB"]

    # Cria o diretório de destino se não existir
    os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)

    # Salva os dados filtrados em um arquivo JSON
    try:
        with open(JSON_PATH, "w", encoding="utf-8") as json_file:
            json.dump(dados_pb, json_file, ensure_ascii=False, indent=4)
        print(f"Dados da Paraíba extraídos e salvos em: {JSON_PATH}")
    except Exception as e:
        print(f"Erro ao salvar o arquivo JSON: {e}")

# Executa a função de extração
extrair_dados_csv_para_json()

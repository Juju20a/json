import json
from flask import Flask, jsonify

app = Flask(__name__)

# Caminho do arquivo JSON gerado pelo seu script Python
JSON_PATH = "src/datasets/dados_paraiba.json"

# Função para carregar os dados JSON
def carregar_dados_json():
    try:
        with open(JSON_PATH, "r", encoding="utf-8") as json_file:
            return json.load(json_file)
    except Exception as e:
        print(f"Erro ao carregar o arquivo JSON: {e}")
        return []

@app.route('/api/clientes', methods=['GET'])
def get_clientes():
    dados = carregar_dados_json()
    if not dados:
        return jsonify({"error": "Não foi possível carregar os dados."}), 500
    return jsonify(dados), 200

if __name__ == '__main__':
    app.run(debug=True)


#burra+

from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
app.template_folder = os.path.dirname(os.path.abspath(__file__))

# Bucle que multiplica por 5 hasta que i llegue a 12
def bucle_multiplicar():
    valor = 1
    resultados = []
    for i in range(1, 13):
        valor = valor * 5
        resultados.append({"i": i, "valor": valor})
    return resultados

# Calculadora simple
def calcular(num1, operacion, num2):
    try:
        num1 = float(num1)
        num2 = float(num2)
        
        if operacion == "+":
            resultado = num1 + num2
        elif operacion == "-":
            resultado = num1 - num2
        elif operacion == "*":
            resultado = num1 * num2
        elif operacion == "/":
            if num2 != 0:
                resultado = num1 / num2
            else:
                return {"error": "Error: No se puede dividir entre cero"}
        else:
            return {"error": "Operación no válida"}
        
        return {"resultado": resultado, "operacion": f"{num1} {operacion} {num2}"}
    except ValueError:
        return {"error": "Números inválidos"}

# Rutas para el servidor web
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/calcular', methods=['POST'])
def api_calcular():
    data = request.json
    resultado = calcular(data.get('num1'), data.get('operacion'), data.get('num2'))
    return jsonify(resultado)

@app.route('/api/bucle', methods=['GET'])
def api_bucle():
    resultados = bucle_multiplicar()
    return jsonify(resultados)

if __name__ == '__main__':
    app.run(debug=True, port=5000)


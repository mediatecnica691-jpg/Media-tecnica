// SAra - Calculadora JS

// Bucle que multiplica por 5 hasta que i llegue a 12
function bucle_multiplicar() {
    const resultados = [];
    let valor = 1;
    
    for (let i = 1; i <= 12; i++) {
        valor = valor * 5;
        resultados.push({ i: i, valor: valor });
    }
    
    return resultados;
}

// Calculadora simple
function calcular(num1, operacion, num2) {
    try {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        
        if (isNaN(num1) || isNaN(num2)) {
            return { error: "Números inválidos" };
        }
        
        let resultado;
        
        switch (operacion) {
            case "+":
                resultado = num1 + num2;
                break;
            case "-":
                resultado = num1 - num2;
                break;
            case "*":
                resultado = num1 * num2;
                break;
            case "/":
                if (num2 !== 0) {
                    resultado = num1 / num2;
                } else {
                    return { error: "Error: No se puede dividir entre cero" };
                }
                break;
            default:
                return { error: "Operación no válida" };
        }
        
        return { 
            resultado: resultado, 
            operacion: `${num1} ${operacion} ${num2}`
        };
    } catch (error) {
        return { error: "Error en el cálculo: " + error.message };
    }
}

// Manejadores del DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar interfaz
    mostrarCalculadora();
});

function mostrarCalculadora() {
    const body = document.body;
    
    body.innerHTML = `
        <div class="container">
            <h1>🧮 SAra - Calculadora</h1>
            
            <!-- Sección Calculadora -->
            <div class="section">
                <h2>Calculadora</h2>
                <div class="form-group">
                    <label for="num1">Primer número:</label>
                    <input type="number" id="num1" placeholder="Ej: 10" step="any">
                </div>
                
                <div class="form-group">
                    <label for="operacion">Operación:</label>
                    <select id="operacion">
                        <option value="+">Suma (+)</option>
                        <option value="-">Resta (-)</option>
                        <option value="*">Multiplicación (*)</option>
                        <option value="/">División (/)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="num2">Segundo número:</label>
                    <input type="number" id="num2" placeholder="Ej: 5" step="any">
                </div>
                
                <div class="button-group">
                    <button onclick="manejarCalcular()">Calcular</button>
                </div>
                
                <div class="loading" id="loading-calc">Procesando...</div>
                <div class="result-box" id="resultado-calc"></div>
            </div>
            
            <!-- Sección Bucle -->
            <div class="section">
                <h2>Bucle de Multiplicación</h2>
                <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Multiplica por 5 desde i=1 hasta i=12</p>
                
                <button onclick="manejarBucle()" style="width: 100%;">Ejecutar Bucle</button>
                
                <div class="loading" id="loading-bucle">Procesando...</div>
                <div class="result-box" id="resultado-bucle"></div>
            </div>
        </div>
    `;
    
    agregarEstilos();
    agregarEventos();
}

function manejarCalcular() {
    const num1 = document.getElementById('num1').value;
    const operacion = document.getElementById('operacion').value;
    const num2 = document.getElementById('num2').value;
    const resultElement = document.getElementById('resultado-calc');
    
    if (!num1 || !num2) {
        resultElement.innerHTML = '<p class="error">Error: Completa ambos números</p>';
        resultElement.classList.add('show');
        return;
    }
    
    const resultado = calcular(num1, operacion, num2);
    
    if (resultado.error) {
        resultElement.innerHTML = `<p class="error">${resultado.error}</p>`;
    } else {
        resultElement.innerHTML = `
            <p><strong>Operación:</strong> ${resultado.operacion}</p>
            <p class="success"><strong>Resultado: ${resultado.resultado}</strong></p>
        `;
    }
    resultElement.classList.add('show');
}

function manejarBucle() {
    const resultElement = document.getElementById('resultado-bucle');
    const datos = bucle_multiplicar();
    
    let html = '<p><strong>Resultados:</strong></p>';
    datos.forEach(item => {
        html += `<div class="bucle-resultado">i = ${item.i}, valor = ${item.valor}</div>`;
    });
    
    resultElement.innerHTML = html;
    resultElement.classList.add('show');
}

function agregarEventos() {
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    
    if (num1) {
        num1.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') manejarCalcular();
        });
    }
    
    if (num2) {
        num2.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') manejarCalcular();
        });
    }
}

function agregarEstilos() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            padding: 30px;
            max-width: 500px;
            width: 100%;
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 15px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: 500;
        }
        
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
        }
        
        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        button {
            flex: 1;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #764ba2;
        }
        
        button:active {
            transform: scale(0.98);
        }
        
        .result-box {
            background: #f0f4ff;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
            margin-top: 15px;
            display: none;
        }
        
        .result-box.show {
            display: block;
        }
        
        .result-box p {
            color: #333;
            margin: 5px 0;
        }
        
        .result-box .error {
            color: #d32f2f;
            font-weight: 600;
        }
        
        .result-box .success {
            color: #388e3c;
            font-weight: 600;
        }
        
        .bucle-resultado {
            background: #f9f9f9;
            padding: 10px;
            border-radius: 3px;
            margin: 5px 0;
            font-family: monospace;
            font-size: 13px;
        }
        
        .loading {
            display: none;
            text-align: center;
            color: #667eea;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

#burra+

# Bucle que multiplica por 5 hasta que i llegue a 12
valor = 1
for i in range(1, 13):
    valor = valor * 5
    print(f"i = {i}, valor = {valor}")

# Calculadora simple
def calculadora():
    print("\n=== CALCULADORA ===")
    print("Operaciones disponibles: +, -, *, /")
    
    num1 = float(input("Ingrese el primer número: "))
    operacion = input("Ingrese la operación (+, -, *, /): ")
    num2 = float(input("Ingrese el segundo número: "))
    
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
            print("Error: No se puede dividir entre cero")
            return
    else:
        print("Operación no válida")
        return
    
    print(f"\nResultado: {num1} {operacion} {num2} = {resultado}")

# Ejecutar la calculadora
calculadora()
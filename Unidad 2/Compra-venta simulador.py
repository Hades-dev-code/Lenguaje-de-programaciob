#Algoritmo bubble_sort
def bubble_sort(products):
    n = len(products)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if products[j]['price'] > products[j+1]['price']:
                products[j], products[j+1] = products[j+1], products[j]
                swapped = True
        if not swapped:
            break
    return products

# Lista de productos para vehículos/motos
products = [
    {'name': 'Aceite de motor', 'price': 25.99},
    {'name': 'Frenos de disco', 'price': 75.50},
    {'name': 'Batería', 'price': 120.00},
    {'name': 'Neumáticos', 'price': 200.00},
    {'name': 'Filtro de aire', 'price': 15.00},
    {'name': 'Luces LED', 'price': 45.00}
]

# Mostrar productos disponibles
print("Productos disponibles:")
for idx, product in enumerate(products):
    print(f"{idx + 1}. {product['name']}: ${product['price']}")
print("\n" + "-" * 40 + "\n")
# Ordenar productos usando Bubble Sort
sorted_products = bubble_sort(products.copy())
print("Productos ordenados por precio (Bubble Sort):")
for product in sorted_products:
    print(f"{product['name']}: ${product['price']}")

# Interacción con el usuario
total_cost = 0
while True:
    try:
        choice = int(input("\nSelecciona el número del producto que deseas comprar (0 para salir): "))
        if choice == 0:
            break
        if 1 <= choice <= len(products):
            total_cost += products[choice - 1]['price']
            print(f"Has añadido {products[choice - 1]['name']} al carrito. Total actual: ${total_cost:.2f}")
        else:
            print("Selección no válida. Intenta de nuevo.")
    except ValueError:
        print("Por favor, ingresa un número válido.")

print(f"\nEl costo total de tus compras es: ${total_cost:.2f}")
print("Gracias por tu compra. ¡Hasta luego!")

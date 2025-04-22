# Roadmap de contenido

### Fase 1 Introducción a los archivos:
	-Tipos de archivos
	-Archivos de texto
	-Archivos Binarios
	-Archivos CSV
	-Archivos JSON
### Fase 2 Operaciones báscicas con Archivos:
	-Apertura y cierre de archivos
	-Uso de open() y close()
	-Lectura de archivos
	-Métodos read(),readline(), y readlines()
	-Escritura de archivos
	-Modos de apertura: w,a,r+
### Fase 3 Manejo de errores y comprobaciones:
	-Manejo de excepciones
	-Uso de try y except
	-Comprobación e la existecia de archivos
	-Uso de os.path.exists()
### Fase 4 Mejoras practicas:
	-Cierre automatico de archivos usando with
	-Uso de la declaracio with para manejar archivos
	-Organizacion y estructura de archivos en proyectos
	-Mejoras practicas para la oraganización de archivos
### Fase 5 Trabajando con formato comunes:
	-Lectura y escritura usando la biblioteca CSV
	-Métodos csv.reader() y csv.writer()
	-Ejemplo práctico con archivos CSV
	-Lectura y escritura de datos tabulares
## Fase 6 Introducción a JSON:
	-Introducción a la biblioteca JSON
	-Serialización y deserialización de datos
	-Ejemplo de carga y guardado de datos en formato JSON	
	-Manipulación de datos en formato JSON

# 🖨️Manejo de Archivos🖨️

Son una forma de poder controlar y gestionar los archivos para su posible uso practico durante la ejecución de un programa. En programación generalmente esto se usa para hacer un respaldo de registros almacenados en la memoria o en un servidor externo. Existen varios tipos de archivos segun su contenido y formato para elegir el metodo adecuado para manipularlos, pero vamos a desacar solo algunos:

	-Archivos de texto: Estos pueden transforman el registro en, como su nombre indica, un formato de texto, que puede ser legible por las personas,por ejemplo, ".txt", ".doc" o ".log" son las extenciones mas comunes de este tipo de archivo. Eston son idealas para almacenar informacion simple y estructurada.
 
	-Archivos Binarios: Estos utilizan el registro para ser llevado a un formato que no es legible para la persona, al menos no de forma directa, pues estos por lo general son trabajados como imagenes o archivos de audio. Las extensiones mas comunes con las que se suele implementar son ".png" o ".jpeg" para las imagenes, ".mp3", "ogg" o ".wav" son los mas usados para los archivos de audio.

	-Archivos CSV (Comma-Separed Values): Aunque esta extensión es de texto estas se usan para la manejar de manera mas ordenadas tablas o registros de una manera mas estructurada debido a su separación por comas.

	-Archivos JSON: Si bien también es una extensión que contiene texto legible, los archivos "JavaScript Object Notations" o JSON suelen ser el resultado que devuelven la mayoria de las aplicaciones webs y APIs al usuario luego de ordenar el registro. Esto lo hace no solo legible para las personas sino tambien para las maquinas, Se utiliza mayormente para tranasmitir datos estrucrados. JSON permite resprentar objetos y arreglos, lo que lo hace muy versatil.

## 💼Apertura y Cierre de archivos (Metodos open y close)💼

Para poder trabajar con un archivo dentro de un programa o aplicación este primero debe abrir el archivo en cuestión, puede ser directamente desde el script o bien puede solicitar al usuario que archivo abrir si es necesario, el programa accedera a la ruta del archivo para poder manipularlo, ya sea para crear, modificar o eliminar su contenido. Con la función "open()" podemos hacer esta tarea.

Sin embargo, una vez el progrma finalice su tarea es ncesario, darle la instrución para cerrar dicho archivo que hemos abierto, si no hacemos esto, el archivo seguirá abierto, ocupando de manera inadvertida la memoria del usuario, incluso si el progrma ya se ha cerrado. El metodo ".close" nos puede ayudar en esto.

python
#Aquí abro el archivo 
archivo = open("mi_archivo.txt")
#Aquí cierro el archivo para ahorrar memoria
archivo.close()


## 📚Lectura de archivos📚

En python, existen mucho métodos para leer los archivos, a contiación se explican algunos de ellos con sus caracteristicas, para el uso que se necesite.   

	-Read(): Esta función lee todo el archivo y lo devuelve como un solo string. Ideal para archivs pequeños.

	-Readline():Esta función solo lee una linea a la vez. Ideal para para archivos archivos grandes en donde no es recomendable cargar todo el contenido en la memoria. 

	-Readlines(): Es capaz de leer todas las lineas y las retorna en una lista, cada elemento elemento de la lista es una linea del archivo.

python
#Aquí voy a leer todo el archivo y lo guardo como un solo string
archivo = open("mi_archivo.txt")
conten=archivo.read()
print(conten)

#Aquí voy a leer el archivo linea por linea. Supongamos que solamente hasta la tercera linea.
for line in range (3)
	linea=archivo.readline()
	print (linea.strip())

#Aqui voy a leer todas las lineas y las guardaré en una lista
lineas=archivo.readlines()
print(lineas)
#No olvidar cerrar el archivo.
archivo.close()


## ✏️Escritura de archivos✏️

De la misma forma python ofrece un manejo en la escritura de archivos con distintos métodos que determinaran como se va a comportar el archivo al ser abierto. Los metodos son:

	-Escribir('w'): Si el archivo no existe, se crea uno nuevo, caso contrario, si el archivo existe, este metodo sobreescribirá en dicho archivo.

	-Añadir ('a'): Este metodo agrega contenido al final del archivo (De la misma forma si el archivo no existe, creara uno nuevo)

	-Leer y escribir ('r+'):Permite leer y escribir en el mismo archivo. Sin embargo, para este método el archivo debe existir. 

python
#Aquí voy a sobreescribir un archivo con 'w'
archivo = open("mi_archivo.txt", "w")
archivo.write("Que rica agua!\n")
print ("Archivo creado o sobrescrito correctamente!"
archivo.close()

#Aquí voy a añadir a un archivo con 'a'
archivo = open("mi_archivo.txt", "a")
archivo.write("Refresco es veneno!\n")
print ("Archivo modificado correctamente!"
archivo.close()

#Aquí voy a leer y escribir un archivo con 'r+'
archivo = open("mi_archivo.txt", "r+")
conten=archivo.read()
print ("Archivo cargado")
archivo.write("El jugo es mejor!\n")
print ("Archivo modificado correctamente!"
archivo.close()
 

## 🛠️Uso de excepciones y manejo de errores (Implementación de try y except)🛠️

En Python, tenemos un manejo de errores bastante intuitivo, con el uso de try y except podemos controlar los errores que puedan suceder durante la ejecución del programa, en lugar de que este explote o finalice sin ningún tipo de explicación aparente para el usuario, el desarrollador esta en la obligación de manejar estos errores y así el usuario no se tope con dichos errores.

En el caso de archivos, los errores que pueden suceder es que, por ejemplo, el usuario ingrese un archivo que no existe en la ruta que especificó, o bien el programa  no puede acceder al archivo por los permisos que el archivo posee.

python 
try:
	archivo = open("mi_archivo.txt")
	conten=archivo.read()
	archivo.close()
except FileNotFoundError:
	print(El archivo no se encontró o no existe")
except exception as e:
	print(f"Haocurrido un error inesperado {e}")

## 🗞️Comprobar si un archivo existe🗞️

Constituye en una buena practica comprobar la existencia de un archivo antes de abrirlo, a continuación veremos como manejar este caso

python 
import os

if os.path.exists("mi_archivo.txt"):
	archivo = open("mi_archivo.txt")
	conten=archivo.read()
	print (conten)
	archivo.close()
else:
	print("El archivo no existe")


## 📝Cierre automatico de Archivos (with)📝
Como ya se explico en varias ocasiones, el cierre de archivos es importante para ahorrar los recursos de la maquina. Sin embargo si se está enfrentando a un codigo muy extento, esta practica de ir cerrando los archivos manualmente puede hacerse una tarea tediosa para el desarrollador. Por eso existe el with, este abrira un archivo y ejecutara un bloque de código y al finalizar el bloque automaticamente cerrará el archivo aún si ocurre un error.

python
with open("mi_archivo.txt") as archivo:
	conten=archivo.read()
	print(conten)
#Aquí el programa cerrará el archivo, automaticamente, pues ya ha recorrido todo el bloque.

## 🗃️Organización y estructura de archivos en proyectos🗃️

Una buena organización de archivoses crucial para mantener la claridad y eficiencia en proyectos de programación. Ejemplo:

mi_proyecto/
?
??? datos/
?   ??? usuarios.json
?   ??? datos.csv
?
??? scripts/
?   ??? leer_datos.py
?   ??? escribir_datos.py
?
??? README.md



## ✒️Manejo de archivos con la biblioteca CSV✒️

Esta biblioteca facilita la manejo de archivos csv, permitiendo manipular datos tabulares de manera eficiente. Por ejemplo:

python 
import csv

## Escribir en un archivo CSV
with open('datos.csv', 'w', newline='') as archivo_csv:
	escritor = csv.writer(archivo_csv)
	escritor.writerow(['Nombre', 'Edad', 'Ciudad'])
	escritor.writerow(['Alice', 30, 'Madrid'])
	escritor.writerow(['Bob', 25, 'Barcelona'])

## Leer desde un archivo CSV
with open('datos.csv', 'r') as archivo_csv:
	lector = csv.reader(archivo_csv)
	for fila in lector:
		print(fila)

 -Ejemplo, Cargar un archivo CSV y calcular un promedio en las edades.

## 📖Leer un archivo CSV y calcular la edad promedio📖
import csv

total_edad = 0
contador = 0

with open('datos.csv', 'r') as archivo_csv:
	lector = csv.reader(archivo_csv)
	next(lector)  # Saltar la cabecera
	for fila in lector:
		total_edad += int(fila[1])
		contador += 1

edad_promedio = total_edad / contador
print(f"La edad promedio es: {edad_promedio}")

## 📒Introducción a la librería y uso de archivos JSON📒

Como ya se menciono, los archivos JSON son archivos de tip texto, ligeros y faciles de leer para las personas y fácil de analizar y generar las maquinas. Se basa en un conjunto de la notacion de objetos en JavaScript, pero es independiente del lenguaje, lo que significa que puede ser usado en varios lenguajes de programación. Por ejemplo, Python. 

python
import json

#Serializar un diccionario a JSON
datos = {
    "nombre": "Alice",
    "edad": 30,
    "ciudad": "Madrid"
}

with open('datos.json', 'w') as archivo_json:
	json.dump(datos, archivo_json)

 #Deserializar un archivo JSON
with open('datos.json', 'r') as archivo_json:
	datos_cargados = json.load(archivo_json)
	print(datos_cargados)

	-Ejemplo, guardar una lista de usuarios en un archivo JSON
python
import json
usuarios = [
    {'nombre': 'Alice', 'edad': 30},
    {'nombre': 'Bob', 'edad': 25}
]
with open('usuarios.json', 'w') as archivo_json:
	json.dump(usuarios, archivo_json)

# 📇Cargar los usuarios desde el archivo JSON📇
with open('usuarios.json', 'r') as archivo_json:
	usuarios_cargados = json.load(archivo_json)
	for usuario in usuarios_cargados:
		print(f"{usuario['nombre']} tiene {usuario['edad']} años.")

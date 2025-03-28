import os
from google.colab import drive
drive.mount('/content/drive')
DIRECTORIOZ = '/content/drive/My Drive/Prueba'

def listararchivos(DIRECTORIOZ, file_extension=None):
    try:
        files = os.listdir(DIRECTORIOZ)
        print("Archivos en el directorio:")

        for file in files:

            if file_extension and not file.endswith(file_extension):
                continue

            print(file)

            if file.endswith('.txt'):
                print(f"Este es un archivo de texto: {file}")
            elif file.endswith('.jpg') or file.endswith('.png'):
                print(f"Este es un archivo de imagen: {file}")
            elif file.endswith('.csv'):
                print(f"Este es un archivo CSV: {file}")
            else:
                print(f"Archivo de otro tipo: {file}")

    except FileNotFoundError:
        print("Directorio no encontrado.")
    except PermissionError:
        print("No tienes permiso para acceder a este directorio.")
    except Exception as e:
        print(f"Ocurrió un error: {e}")


listararchivos(DIRECTORIOZ)

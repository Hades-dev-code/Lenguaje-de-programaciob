# 💻Procesador de Archivos Web con Flask💻

 Este proyecto es una app que utiliza flask para permitir que los usuarios puedan cargar diversos tipos de archivos (texto, PDF, imágenes y audio), procesarlos de diferentes maneras y visualizar información sobre ellos.

 # 📍 Planteamiento del problema 📍
 La idea principal de esta app es proporcionar una interfaz web sencilla para interactuar con archivos locales.

 La misma permite:
 
 1️⃣- Subir archivos simultáneamente.
 
 2️⃣- Esta muestra información del archivo (nombre, tamaño y tipo).
 
 3️⃣-En la pagina generada se puede leer y mostrar el contenido del archivo subido.
 
 4️⃣- Puede extraer y mostrar el texto contenido en archivos PDF.
 
 5️⃣- Se puede subir y imágenes para luego ser visualisadas en la pagina de resultado.
 
 6️⃣- Se pueden subir y almacenar archivos de audio.
 
 # 🔎 Características principales 🔎

**Soporte para múltiples tipos de archivos:** Admite archivos de texto (`.txt`), PDF (`.pdf`), imágenes (`.png`, `.jpg`, `.jpeg`, `.gif`) y audio (`.mp3`, `.wav`, `.ogg`).
 
 **Validación de tipos de archivo:** Asegura que solo se procesen los archivos con las extensiones permitidas.
 
**Lectura y visualización de archivos de texto:** Permite ver el contenido plano de los archivos `.txt` directamente en la página de resultados.

**Extracción de texto desde PDF:** Utiliza la biblioteca `pdfminer.high_level` para extraer el texto de los archivos `.pdf` y lo muestra al usuario.

**Previsualización de imágenes:** Muestra las imágenes subidas directamente en la página de resultados utilizando la codificación base64.

**Carga y almacenamiento de archivos de audio:** Permite subir archivos de audio y los guarda en una carpeta específica en el servidor.

**Guardado de archivos de texto editados:** Ofrece la funcionalidad de enviar contenido de texto desde el navegador al servidor para guardarlo en un nuevo archivo.

**Manejo de errores:** Incluye un manejo básico de errores, por ejemplo, al intentar leer archivos PDF.

**Organización de archivos:** Utiliza carpetas específicas (`uploads` y `static/audio`) para organizar los archivos subidos en el servidor.

**Cierre seguro de archivos:** Emplea la declaración `with open(...)` para asegurar que los archivos se cierren correctamente después de su manipulación.

# 💡Para mejorar💡

Este codigo puede tener una amplia gama de mejoria pero por ahora estos son los detalles que se me ocurren por ahora:

Podria implementarse la lectura y escritura de archivos CSV utilizando la biblioteca `csv`.

Tambien podria implementarse la lectura y escritura de archivos JSON utilizando la biblioteca `json`.

Añadir funcionalidades extra para editar y guardar otros tipos de archivos.

Mejorar el manejo de errores y la retroalimentación al usuario para evitar fallos y disgusto de los usuarios a la hora de usar el codigo.

Implementar una interfaz de usuario más robusta y atractiva (urgente!!!, pero por ahora la aue tiene es la que logree hacer 🥺).

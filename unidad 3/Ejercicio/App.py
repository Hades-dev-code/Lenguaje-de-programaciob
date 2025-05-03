# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, url_for, jsonify
import os
import math
import base64
from werkzeug.utils import secure_filename
from pdfminer.high_level import extract_text
from fpdf import FPDF # <--- Importar FPDF

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['AUDIO_FOLDER'] = os.path.join('static', 'audio')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav', 'ogg', 'log', 'md'} # Añadir extensiones de texto si es necesario

# --- format_bytes y allowed_file (sin cambios) ---
def format_bytes(bytes_num, decimals = 2):
    if not isinstance(bytes_num, (int, float)) or bytes_num == 0:
       return "0 Bytes"
    k = 1024
    dm = 0 if decimals < 0 else decimals
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    try:
        if bytes_num <= 0: return "0 Bytes"
        i = math.floor(math.log(bytes_num) / math.log(k))
        i = min(i, len(sizes) - 1)
        return f"{bytes_num / (k ** i):.{dm}f} {sizes[i]}"
    except ValueError:
         return "0 Bytes"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app.jinja_env.filters['format_bytes'] = format_bytes

# --- Rutas / y /result (sin cambios funcionales mayores) ---
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    if 'files' not in request.files:
        return render_template('index.html', error='No se seleccionaron archivos.')

    files = request.files.getlist('files')
    uploaded_files_data = []
    temp_pdf_paths = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)
            # *** Guardar el content_type original ***
            original_content_type = file.content_type

            file_content = None
            pdf_text = None
            image_data = None
            filepath_for_pdf = None

            try:
                # Usar original_content_type para la lógica
                if original_content_type.startswith('text/'):
                    try:
                        file_content = file.read().decode('utf-8')
                    except UnicodeDecodeError:
                        try:
                            file.seek(0)
                            file_content = file.read().decode('latin-1')
                        except Exception as decode_err:
                            file_content = f"Error al decodificar el archivo: {decode_err}"
                    file.seek(0)
                elif original_content_type == 'application/pdf':
                    # Asegurar nombre único para temporal si se suben varios con mismo nombre
                    temp_filename = f"temp_{os.urandom(8).hex()}_{filename}"
                    filepath_for_pdf = os.path.join(app.config['UPLOAD_FOLDER'], temp_filename)
                    file.save(filepath_for_pdf)
                    temp_pdf_paths.append(filepath_for_pdf)
                    pdf_text = extract_text(filepath_for_pdf)
                    # pdf_text puede ser None si pdfminer falla, manejar eso
                    if pdf_text is None:
                        pdf_text = "[Error al extraer texto del PDF]"
                elif original_content_type.startswith('image/'):
                    image_data = base64.b64encode(file.read()).decode('utf-8')
                    file.seek(0)
            except Exception as e:
                 print(f"Error procesando {filename}: {e}")
                 pdf_text = f"Error al procesar archivo: {e}" # Asignar error a pdf_text por si acaso

            uploaded_files_data.append({
                'filename': filename,
                'file_size': file_size,
                'file_type': original_content_type, # Pasar el tipo original a la plantilla
                'file_content': file_content,
                'pdf_text': pdf_text,
                'image_data': image_data
            })

    # Limpiar archivos PDF temporales
    for path in temp_pdf_paths:
        try:
            if os.path.exists(path):
                os.remove(path)
        except OSError as e:
            print(f"Error al borrar archivo temporal {path}: {e}")

    audio_file = request.files.get('audio')
    audio_filename = None
    if audio_file and allowed_file(audio_file.filename) and audio_file.content_type.startswith('audio/'):
        audio_filename = secure_filename(audio_file.filename)
        audio_filepath = os.path.join(app.config['AUDIO_FOLDER'], audio_filename)
        try:
            audio_file.save(audio_filepath)
        except Exception as e:
            print(f"Error al guardar archivo de audio {audio_filename}: {e}")
            audio_filename = None

    return render_template('result.html', files=uploaded_files_data, audio_filename=audio_filename)


# --- Ruta /save_file ACTUALIZADA ---
@app.route('/save_file', methods=['POST'])
def save_file():
    print("\n--- save_file route initiated ---")
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        original_filename = data.get('filename') # El nombre original que tenía en la página
        content = data.get('content')
        # *** Recibir la acción y el tipo de archivo original ***
        action = data.get('action', 'overwrite') # 'overwrite' o 'save_as_new'
        original_file_type = data.get('file_type', '') # Ej: 'text/plain', 'application/pdf'

        if not original_filename or content is None:
            print("Error: Filename or content missing.")
            return jsonify({'success': False, 'error': 'Nombre de archivo o contenido no proporcionado.'})

        print(f"Original filename: {original_filename}, Action: {action}, Original Type: {original_file_type}")
        filename = secure_filename(original_filename)
        print(f"Secure filename: {filename}")

        if not filename:
            print("Error: Secure filename is empty.")
            return jsonify({'success': False, 'error': 'Nombre de archivo original no válido o inseguro.'})

        upload_dir_absolute = os.path.abspath(app.config['UPLOAD_FOLDER'])
        print(f"Upload directory (absolute): '{upload_dir_absolute}'")

        filepath = os.path.join(upload_dir_absolute, filename) # Ruta por defecto (sobrescribir)
        final_filename = filename # Nombre final por defecto

        # --- Lógica para "Guardar Como Nuevo" para archivos de texto ---
        # Identificar tipos de texto comunes
        is_text_file = original_file_type.startswith('text/') or filename.lower().endswith(('.txt', '.log', '.md', '.csv')) # Añadir más si es necesario

        if is_text_file and action == 'save_as_new':
            base, ext = os.path.splitext(filename)
            counter = 1
            # Generar nuevo nombre hasta encontrar uno libre
            new_filename = f"{base}_edited{ext}"
            new_filepath = os.path.join(upload_dir_absolute, new_filename)
            while os.path.exists(new_filepath):
                new_filename = f"{base}_edited_{counter}{ext}"
                new_filepath = os.path.join(upload_dir_absolute, new_filename)
                counter += 1
            final_filename = new_filename # Actualizar nombre final
            filepath = new_filepath # Actualizar ruta final
            print(f"Action 'save_as_new': generated new filename '{final_filename}'")
        else:
            # Si no es 'save_as_new' o no es archivo de texto, usa la ruta original (sobrescribir)
            filepath = os.path.join(upload_dir_absolute, final_filename)


        print(f"Final filepath determined: '{filepath}'")

        # Verificar/Crear directorio de subida
        if not os.path.isdir(upload_dir_absolute):
            print(f"Warning: Upload directory does not exist: '{upload_dir_absolute}'. Attempting to create.")
            try:
                os.makedirs(upload_dir_absolute, exist_ok=True)
                print(f"Successfully created missing directory: '{upload_dir_absolute}'")
            except Exception as mkdir_e:
                print(f"CRITICAL ERROR: Failed to create upload directory '{upload_dir_absolute}': {mkdir_e}")
                return jsonify({'success': False, 'error': f'Directorio de subida no existe y no se pudo crear: {upload_dir_absolute}'})

        # --- Lógica para Guardar: PDF o Texto ---
        if original_file_type == 'application/pdf':
            print(f"Saving as PDF: '{filepath}'")
            try:
                pdf = FPDF()
                pdf.add_page()
                # Usar una fuente que soporte UTF-8 si es posible, o manejar errores
                # Para simplificar, intentaremos con 'Arial'. Puede fallar con caracteres especiales.
                # Para soporte Unicode completo, se recomienda instalar una fuente TTF y usar:
                # pdf.add_font('DejaVu', '', 'DejaVuSansCondensed.ttf', uni=True) # Ejemplo
                # pdf.set_font('DejaVu', '', 12)
                pdf.set_font('Arial', size=12)
                # Escribir contenido usando multi_cell para auto-wrap
                # Tratar de codificar a latin-1 reemplazando caracteres no soportados si se usan fuentes base
                # O mejor, si fpdf2 maneja bien unicode con fuentes base, usar directamente:
                pdf.multi_cell(0, 10, content)
                # Guardar el archivo PDF
                pdf.output(filepath, 'F')
                print(f"Successfully wrote PDF to '{filepath}'")
            except Exception as pdf_err:
                print(f"---!!! EXCEPTION while generating PDF !!!---")
                import traceback
                print(f"Error type: {type(pdf_err).__name__}")
                print(f"Error message: {pdf_err}")
                print(traceback.format_exc())
                print(f"--- END PDF EXCEPTION ---")
                return jsonify({'success': False, 'error': f'Error al generar el archivo PDF: {pdf_err}'})
        else: # Guardar como archivo de texto plano
            print(f"Saving as TEXT: '{filepath}'")
            try:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Successfully wrote TEXT to '{filepath}'")
            except Exception as txt_err:
                 print(f"---!!! EXCEPTION while writing TEXT file !!!---")
                 import traceback
                 print(f"Error type: {type(txt_err).__name__}")
                 print(f"Error message: {txt_err}")
                 print(traceback.format_exc())
                 print(f"--- END TEXT EXCEPTION ---")
                 return jsonify({'success': False, 'error': f'Error al escribir el archivo de texto: {txt_err}'})

        # Devolver éxito y el nombre final
        return jsonify({'success': True, 'filename_saved_as': final_filename})

    except Exception as e:
        import traceback
        print("\n---!!! UNHANDLED EXCEPTION IN save_file !!!---")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {e}")
        print("Traceback:")
        print(traceback.format_exc())
        print("--- END EXCEPTION ---")
        return jsonify({'success': False, 'error': f'Error interno del servidor inesperado. Revise la consola de Flask.'})


# --- Bloque main (sin cambios) ---
if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['AUDIO_FOLDER'], exist_ok=True)
    # Considera usar host='0.0.0.0' si necesitas acceder desde otros dispositivos en tu red local
    app.run(debug=True)
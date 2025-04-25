from flask import Flask, request, render_template, url_for, jsonify
import os
import math
import base64
from werkzeug.utils import secure_filename
from pdfminer.high_level import extract_text

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['AUDIO_FOLDER'] = os.path.join('static', 'audio') # Se define la carpeta para audio
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav', 'ogg'}

def format_bytes(bytes, decimals = 2):
    if not bytes:
        return "0 Bytes"
    k = 1024
    dm = 0 if decimals < 0 else decimals
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    i = math.floor(math.log(bytes) / math.log(k))
    return f"{bytes / (k ** i):.{dm}f} {sizes[i]}"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app.jinja_env.filters['format_bytes'] = format_bytes

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    if 'files' not in request.files:
        return render_template('index.html', error='No se seleccionaron archivos.')

    files = request.files.getlist('files')
    uploaded_files_data = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_size = len(file.read())
            file.seek(0)
            file_type = file.content_type

            file_content = None
            pdf_text = None
            image_data = None

            if file_type.startswith('text/'):
                file_content = file.read().decode('utf-8')
                file.seek(0)
            elif file_type == 'application/pdf':
                try:
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    pdf_text = extract_text(filepath)
                    os.remove(filepath)
                except Exception as e:
                    pdf_text = f"Error al leer PDF: {e}"
            elif file_type.startswith('image/'):
                image_data = base64.b64encode(file.read()).decode('utf-8')
                file.seek(0)

            uploaded_files_data.append({
                'filename': filename,
                'file_size': file_size,
                'file_type': file_type,
                'file_content': file_content,
                'pdf_text': pdf_text,
                'image_data': image_data
            })

    audio_file = request.files.get('audio')
    audio_filename = None
    if audio_file and allowed_file(audio_file.filename) and audio_file.content_type.startswith('audio/'):
        audio_filename = secure_filename(audio_file.filename)
        audio_filepath = os.path.join(app.config['AUDIO_FOLDER'], audio_filename)
        audio_file.save(audio_filepath) # Se guarda el archivo de audio

    return render_template('result.html', files=uploaded_files_data, audio_filename=audio_filename)

@app.route('/save_file', methods=['POST'])
def save_file():
    data = request.get_json()
    filename = data.get('filename')
    content = data.get('content')

    if filename and content is not None:
        try:
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})
    else:
        return jsonify({'success': False, 'error': 'Nombre de archivo o contenido no proporcionado.'})

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['AUDIO_FOLDER'], exist_ok=True) # Se crea la carpeta de audio si no existe
    app.run(debug=True)
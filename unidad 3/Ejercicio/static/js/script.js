document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-upload');
    const fileInfoDiv = document.getElementById('file-info');
    const textEditors = document.querySelectorAll('textarea[id^="text-editor-"]');
    const saveButtons = document.querySelectorAll('.save-button');
    const audioInput = document.getElementById('audio-upload');
    const audioPlayerDiv = document.getElementById('audio-player');
    let audioPlayerElement;

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = 0 if decimals < 0 else decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    function updateFileInfo(files) {
        fileInfoDiv.innerHTML = '';
        if (files && files.length > 0) {
            const title = document.createElement('h3');
            title.textContent = 'Archivos Seleccionados:';
            fileInfoDiv.appendChild(title);
            for (const file of files) {
                const fileName = file.name;
                const fileSize = formatBytes(file.size);
                const fileType = file.type || 'Desconocido';

                const fileDetails = document.createElement('p');
                fileDetails.innerHTML = `<strong>Nombre:</strong> ${fileName}, <strong>Peso:</strong> ${fileSize}, <strong>Tipo:</strong> ${fileType}`;
                fileInfoDiv.appendChild(fileDetails);
            }
        } else {
            const noFileParagraph = document.createElement('p');
            noFileParagraph.textContent = 'No se ha seleccionado ningún archivo.';
            fileInfoDiv.appendChild(noFileParagraph);
        }
    }

    if (fileInput && fileInfoDiv) {
        fileInput.addEventListener('change', function() {
            updateFileInfo(this.files);
        });
    }

    textEditors.forEach((editor, index) => {
        editor.addEventListener('input', function() {
            const sizeSpan = document.querySelector(`#file-content-${index + 1} + p > strong + span`);
            if (sizeSpan) {
                sizeSpan.textContent = formatBytes(this.value.length);
            }
        });
    });

    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            const editor = document.getElementById(`text-editor-${index}`);
            const filename = "{{ files[index].filename if files else '' }}";
            const newContent = editor.value;
            fetch('/save_file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filename: filename, content: newContent })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Archivo "${filename}" guardado exitosamente.`);
                    const sizeSpan = document.querySelector(`#file-content-${index + 1} + p > strong + span`);
                    if (sizeSpan) {
                        sizeSpan.textContent = formatBytes(newContent.length);
                    }
                } else {
                    alert(`Error al guardar "${filename}": ${data.error || 'Desconocido'}`);
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud de guardado:', error);
                alert(`Error al guardar "${filename}".`);
            });
        });
    });

    if (audioInput && audioPlayerDiv) {
        audioInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const audioFile = this.files[0];
                const audioURL = URL.createObjectURL(audioFile);
                if (!audioPlayerElement) {
                    audioPlayerElement = document.createElement('audio');
                    audioPlayerElement.controls = true;
                    audioPlayerDiv.appendChild(audioPlayerElement);
                }
                audioPlayerElement.src = audioURL;
            } else {
                audioPlayerDiv.innerHTML = '<p>No se ha seleccionado ningún archivo de audio.</p>';
                audioPlayerElement = null;
            }
        });
    }
});
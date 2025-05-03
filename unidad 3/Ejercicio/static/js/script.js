// static/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y procesado.');

    const fileInput = document.getElementById('file-upload');
    const fileInfoDiv = document.getElementById('file-info');
    const audioInput = document.getElementById('audio-upload');
    const audioPlayerDiv = document.getElementById('audio-player');
    let audioPlayerElement;

    // --- Elementos para Drag and Drop ---
    const dropZone = document.getElementById('drop-zone');

    // Verificar si estamos en la página de subida (index.html) donde existe dropZone
    if (dropZone && fileInput) {
        console.log('Zona de drop y input de archivo encontrados.');

        // Hacer que al hacer clic en la zona se abra el selector de archivos
        dropZone.addEventListener('click', () => {
            fileInput.click(); // Dispara el click en el input oculto
        });

        // Prevenir comportamiento por defecto al arrastrar sobre la ventana
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Eventos de la zona de drop
        dropZone.addEventListener('dragenter', handleDragEnter, false);
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('dragleave', handleDragLeave, false);
        dropZone.addEventListener('drop', handleDrop, false);

        // También escuchar cambios en el input (por si se usa el click)
        fileInput.addEventListener('change', handleFilesUpdate, false);

    } else {
         console.log('No se encontró la zona de drop o el input de archivo (probablemente no estamos en index.html)');
    }

    // --- Funciones de ayuda para Drag and Drop ---
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDragEnter(e) {
        preventDefaults(e);
        console.log('Drag Enter');
        // Añadir clase para feedback visual
        dropZone.classList.add('drag-over');
    }

    function handleDragOver(e) {
        preventDefaults(e);
        console.log('Drag Over');
        // Necesario para permitir el drop
        dropZone.classList.add('drag-over'); // Asegurar que sigue activa
    }

    function handleDragLeave(e) {
        preventDefaults(e);
        console.log('Drag Leave');
        // Quitar clase para feedback visual
        dropZone.classList.remove('drag-over');
    }

    function handleDrop(e) {
        preventDefaults(e);
        console.log('Drop');
        dropZone.classList.remove('drag-over');

        // Obtener los archivos del evento drop
        const dt = e.dataTransfer;
        const files = dt.files;

        console.log('Archivos soltados:', files);

        // Asignar los archivos soltados al input de archivo original
        // Esto permite que el formulario los envíe como si se hubieran seleccionado manualmente
        try {
             fileInput.files = files;
             // Llamar manualmente a la función que actualiza la UI,
             // ya que asignar .files no siempre dispara el evento 'change'.
             handleFilesUpdate();
        } catch (error) {
            console.error("Error al asignar archivos al input:", error);
            alert("Hubo un error al procesar los archivos soltados.");
        }
    }

     // --- Función para manejar la actualización de archivos (desde input o drop) ---
    function handleFilesUpdate() {
        console.log('Actualizando información de archivos...');
        if (fileInput && fileInfoDiv) {
             updateFileInfo(fileInput.files); // Llama a la función existente
        } else {
            console.warn("No se encontró fileInput o fileInfoDiv al intentar actualizar.");
        }
    }


    // --- Función formatBytes (sin cambios) ---
    function formatBytes(bytes, decimals = 2) {
        // ... (código formatBytes) ...
        if (typeof bytes !== 'number' || bytes <= 0 || isNaN(bytes)) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const index = Math.min(i, sizes.length - 1);
        return `${parseFloat((bytes / Math.pow(k, index)).toFixed(dm))} ${sizes[index]}`;
    }

    // --- Función updateFileInfo (modificada ligeramente para asegurar que existe fileInfoDiv) ---
    function updateFileInfo(files) {
        if (!fileInfoDiv) {
             console.warn("Intentando actualizar fileInfoDiv, pero no existe.");
             return; // Salir si no estamos en la página correcta
        }
        fileInfoDiv.innerHTML = ''; // Limpiar contenido anterior
        if (files && files.length > 0) {
            const title = document.createElement('h3');
            title.textContent = 'Archivos Seleccionados:';
            fileInfoDiv.appendChild(title);
            // Validar tipos de archivo aquí si es necesario
            let allowedFiles = [];
            let disallowedFiles = [];
            const allowedExtensions = ['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'log', 'md']; // Coincidir con ALLOWED_EXTENSIONS de Flask (sin audio)

            for (const file of files) {
                const fileExt = file.name.split('.').pop().toLowerCase();
                 if (allowedExtensions.includes(fileExt)) {
                    allowedFiles.push(file);
                    const fileName = file.name;
                    const fileSize = formatBytes(file.size);
                    const fileType = file.type || 'Desconocido';
                    const fileDetails = document.createElement('p');
                    fileDetails.innerHTML = `<strong>Nombre:</strong> ${fileName}, <strong>Peso:</strong> ${fileSize}, <strong>Tipo:</strong> ${fileType}`;
                    fileInfoDiv.appendChild(fileDetails);
                 } else {
                      disallowedFiles.push(file.name);
                 }
            }

            // Mostrar advertencia si se soltaron archivos no permitidos
            if (disallowedFiles.length > 0) {
                 const errorMsg = document.createElement('p');
                 errorMsg.className = 'error'; // Usar clase de error existente
                 errorMsg.innerHTML = `<strong>Archivos omitidos (tipo no permitido):</strong> ${disallowedFiles.join(', ')}`;
                 fileInfoDiv.appendChild(errorMsg);
            }

             // Actualizar el input de archivo solo con los archivos permitidos (FileList es read-only, así que esto es conceptual)
             // La validación final ocurrirá en el backend. El frontend solo informa.
             console.log("Archivos permitidos:", allowedFiles.map(f => f.name));


        } else {
            const noFileParagraph = document.createElement('p');
            noFileParagraph.textContent = 'No se ha seleccionado ningún archivo.';
            fileInfoDiv.appendChild(noFileParagraph);
        }
    }


    // --- Código para result.html (Botones de guardar, etc.) ---
    const saveButtons = document.querySelectorAll('.save-button');
    if (saveButtons.length > 0) {
        console.log(`Encontrados ${saveButtons.length} botones de guardar (en result.html).`);
        // ... (El código existente para los saveButtons va aquí, sin cambios) ...
        saveButtons.forEach((button, buttonIndex) => {
            // ... (El código del addEventListener para los botones de guardar) ...
             console.log(`Añadiendo listener al botón ${buttonIndex + 1}`, button);
             button.addEventListener('click', function() {
                  console.log('--- ¡Click en botón de guardar detectado! ---');
                  // ... (El resto del código del handler del click de guardar) ...
                   const index = this.dataset.index;
                   const filename = this.dataset.filename;
                   const filetype = this.dataset.filetype;
                   // ... etc ...

                   if (!index || !filename || !filetype) { console.error('Error Crítico: Faltan datos (index, filename o filetype) en el botón.'); alert('Error interno (JS): No se pudo identificar qué archivo o tipo guardar.'); return; }
                   const editorId = `text-editor-${index}`;
                   const editor = document.getElementById(editorId);
                   if (!editor) { console.error(`Error Crítico: No se encontró editor con ID '${editorId}'.`); alert(`Error interno (JS): No se encontró el área de texto.`); return; }
                   const newContent = editor.value;

                   let saveAction = 'overwrite';
                   if (filetype.startsWith('text/')) {
                       const overwrite = confirm(`¿Deseas sobrescribir el archivo existente '${filename}'?`);
                       if (!overwrite) {
                           const saveAsNew = confirm("¿Deseas guardar los cambios en un archivo nuevo (ej: nombre_edited.txt)?");
                           if (saveAsNew) { saveAction = 'save_as_new'; } else { console.log("Guardado cancelado."); alert("Guardado cancelado."); return; }
                       }
                   } else if (filetype === 'application/pdf') { saveAction = 'overwrite_pdf'; }

                   this.disabled = true; this.textContent = 'Guardando...';
                   console.log(`>>> Preparando fetch a /save_file con: filename=${filename}, action=${saveAction}, file_type=${filetype}`);

                   fetch('/save_file', { /* ... fetch options ... */
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ filename: filename, content: newContent, action: saveAction, file_type: filetype })
                   })
                   .then(response => { /* ... response handling ... */
                        console.log('<<< Respuesta recibida del fetch:', response);
                        if (!response.ok) { return response.json().then(errData => { throw new Error(errData.error || `Error: ${response.statusText}`); }).catch(() => { throw new Error(`Error: ${response.statusText} (Respuesta no JSON)`); }); }
                        return response.json();
                   })
                   .then(data => { /* ... success handling ... */
                        console.log('Datos JSON de la respuesta:', data);
                        if (data.success) { alert(`Archivo guardado exitosamente como "${data.filename_saved_as}".`); /* ... update size span ... */ }
                        else { console.error('Error reportado por el servidor:', data.error); alert(`Error al guardar "${filename}": ${data.error || 'Desconocido.'}`); }
                   })
                   .catch(error => { /* ... error handling ... */
                         console.error('<<< ERROR en fetch >>>:', error); alert(`Error al intentar guardar: ${error.message || 'Error de red.'}`);
                   })
                   .finally(() => { /* ... finally block ... */
                         console.log('--- Ejecutando finally del fetch ---'); this.disabled = false; const buttonText = filetype === 'application/pdf' ? 'Guardar Cambios (como PDF simple)' : 'Guardar Cambios'; this.textContent = buttonText;
                   });
             });
        });
    } else {
        console.log('No se encontraron botones de guardar (probablemente estamos en index.html)');
    }


     // --- Listener para actualizar tamaño mientras se edita (result.html) ---
     const textEditors = document.querySelectorAll('textarea[id^="text-editor-"]');
     if (textEditors.length > 0) {
        console.log(`Encontrados ${textEditors.length} editores de texto (en result.html).`);
        // ... (El código existente para los textEditors input listener va aquí) ...
         textEditors.forEach((editor) => {
             editor.addEventListener('input', function() { /* ... código para actualizar tamaño ... */ });
         });
     }


    // --- Listener de audio (sin cambios) ---
    if (audioInput && audioPlayerDiv) {
        // ... (código del audio) ...
         audioInput.addEventListener('change', function() { /* ... código del handler del audio ... */ });
    }

    console.log('Script script.js cargado y ejecutado completamente.');

}); // Fin de DOMContentLoaded
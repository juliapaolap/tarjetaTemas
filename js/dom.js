document.addEventListener('DOMContentLoaded', () => 
    {
        // Elementos del DOM que necesitamos manipular
        let seleccionarTema = document.getElementById('seleccionarTema');
        let selectorColorFondo = document.getElementById('selectorColorFondo');
        let opcionesDibujo = document.getElementById('opcionesDibujo');
        let botonListo = document.getElementById('botonListo');
        
        let tarjeta = document.getElementById('tarjeta');
        let tituloTarjeta = document.getElementById('tituloTarjeta');
        let imagenTarjeta = document.getElementById('imagenTarjeta');
        let nombreDestinatario = document.getElementById('nombreDestinatario');
        let mensajeTarjeta = document.getElementById('mensajeTarjeta');
    
        let inputNombreDestinatario = document.getElementById('inputNombreDestinatario');
        let inputTituloTarjeta = document.getElementById('inputTituloTarjeta');
        let inputMensaje = document.getElementById('inputMensaje');
    
        // Definimos los temas, con sus respectivas imágenes
        let temas = {
            navidad: {
                imagenes: ['imagenes/dibujo/dibujo-navidad1.jpg', 'imagenes/dibujo/dibujo-navidad2.jpg', 'imagenes/dibujo/dibujo-navidad3.jpg']
            },
            añonuevo: {
                imagenes: ['imagenes/dibujo/dibujo-añonuevo1.jpg', 'imagenes/dibujo/dibujo-añonuevo2.jpg', 'imagenes/dibujo/dibujo-añonuevo3.jpg']
            },
            sanvalentin: {
                imagenes: ['imagenes/dibujo/dibujo-sanvalentin1.jpg', 'imagenes/dibujo/dibujo-sanvalentin2.jpg', 'imagenes/dibujo/dibujo-sanvalentin3.jpg']
            }
        };
    
        // Función para actualizar las imágenes
        function actualizarOpcionesDibujo() 
        {
            let temaSeleccionado = seleccionarTema.value;
            let imagenes = temas[temaSeleccionado].imagenes;
            opcionesDibujo.innerHTML = imagenes.map(imagen => `<img src="${imagen}" class="opcion-dibujo">`).join('');
            agregarEventosClicImagen('opcion-dibujo', (src) => {
                imagenTarjeta.src = src;
            });
        }
    
        // Función para agregar eventos de clic a las imágenes
        function agregarEventosClicImagen(nombreClase, callback) 
        {
            let opciones = document.getElementsByClassName(nombreClase);
            for (let opcion of opciones) {
                opcion.addEventListener('click', () => {
                    for (let opt of opciones) {
                        opt.classList.remove('seleccionada');  // Eliminamos la selección previa
                    }
                    opcion.classList.add('seleccionada');  // Marcamos la imagen seleccionada
                    callback(opcion.src);  // Actualizamos la imagen de vista previa
                });
            }
        }
    
        // Escuchar los cambios en el tema para actualizar las imágenes
        seleccionarTema.addEventListener('change', () => {
            actualizarOpcionesDibujo();
        });
    
        // Escuchar el cambio de color para el fondo de la tarjeta
        selectorColorFondo.addEventListener('input', (e) => {
            tarjeta.style.backgroundColor = e.target.value;
        });
    
        // Escuchar el cambio de texto en los campos de texto
        inputNombreDestinatario.addEventListener('input', () => {
            nombreDestinatario.textContent = inputNombreDestinatario.value;
        });
    
        inputTituloTarjeta.addEventListener('input', () => {
            tituloTarjeta.textContent = inputTituloTarjeta.value;
        });
    
        inputMensaje.addEventListener('input', () => {
            mensajeTarjeta.textContent = inputMensaje.value;
        });
    
        // Botón para finalizar la configuración
        botonListo.addEventListener('click', () => {
            let nuevaVentana = window.open("", "_blank", "width=800,height=600");
    
            // Crear el contenido HTML de la nueva ventana con la tarjeta personalizada
            nuevaVentana.document.write(`
                <html>
                    <head>
                        <title>Tarjeta Personalizada</title>
                        <style>
                            body {
                                font-family: Verdana, Geneva, Tahoma, sans-serif;
                                background-color: #f0f0f0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                            }
                            .tarjeta {
                                text-align: center;
                                padding: 20px;
                                border: 3px solid #000;
                                background-color: ${tarjeta.style.backgroundColor};
                                width: 50%;
                            }
                            .tarjeta h2 {
                                margin: 10px 0;
                            }
                            .tarjeta h3 {
                                margin: 5px 0;
                            }
                            .tarjeta p {
                                font-size: 17px;
                                margin: 10px 0;
                            }
                            .imagen-centrada {
                                width: 100%;
                                height: auto;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="tarjeta">
                            <h2>${tituloTarjeta.textContent}</h2>
                            <img src="${imagenTarjeta.src}" alt="Imagen" class="imagen-centrada">
                            <h3>${nombreDestinatario.textContent}</h3>
                            <p>${mensajeTarjeta.textContent}</p>
                        </div>
                    </body>
                </html>
            `);
            nuevaVentana.document.close();
        });
    
        // Inicializamos el tema por defecto
        actualizarOpcionesDibujo();
    });
        
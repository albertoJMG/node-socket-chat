var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('En nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//Escuchar sucesos
socket.on("connect", function () {
    console.log("Cliente - Conectado al servidor");
    socket.emit('entrarChat', usuario, function (resp) {
        //console.log('Usuarios conectados', resp)
        renderizarUsuarios(resp);
    })
});

//Escuchar
socket.on("disconnect", function () {
    console.log("Perdimos conexión con el servidor");
});

//Enviar informacion
// socket.emit(
//     "crearMensaje",
//     {
//         usuario: "Alberto",
//         mensaje: "Hola mundo",
//     },
//     function (resp) {
//         console.log("Respuesta server: ", resp);
//     }
// );

//Escuchar informacion
socket.on("crearMensaje", function (mensaje) {
    //console.log("Servidor: ", mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});


//Escuchar cambios de usuarios
//cuando un usuario entra o sale del chat
socket.on("listaPersonas", function (personas) {
    //console.log("Servidor: ", personas);
    renderizarUsuarios(personas);
});

//Mensajes privados
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje privado: ', mensaje)
})
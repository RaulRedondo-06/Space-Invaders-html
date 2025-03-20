let dom = $(document);

dom.ready(iniciarEvento);

function iniciarEvento() {
    dom.keydown(function(event) { // Al presionar espacio inicia el evento
        if (event.keyCode === 32) { 
            MakeProjecil();
        }
    });
}

function MakeProjecil() {
    let nuevaBala = $('<div class="bala mover"></div>');//Creamos el objeto con las dos clases, una que le da el movimiento y otra para el color y tamaño


    $('body').append(nuevaBala);

    
    let characterPosition = $('#character').position();  //le damos la posicion (por rebisar)
    nuevaBala.css({
        bottom:$('#character').height() + 15 + 'px', 
        left: characterPosition.left + $('#character').width() / 2 - 5 + 'px', //
        display: 'block', // Hacerla visible
    });

    nuevaBala.on('animationend', function() {//Esto es que si la bala completa la animacion la quita de la realidad misma
        $(this).remove(); 
    });

}
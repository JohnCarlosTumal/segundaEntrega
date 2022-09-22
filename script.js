
// botones de cambio de color de pagina

let darkMode

if (localStorage.getItem("darkMode")) { //null si no existe la key
    darkMode = localStorage.getItem("darkMode") //consulto el local storage
} else {
    localStorage.setItem("darkMode", "light") //Creo
}

if (darkMode == "dark") {
    document.body.classList.add('darkMode')
}


// llamando id desde index.html

const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")
const botonProductos = document.getElementById("botonProductos")
const divProductos = document.getElementById("divProductos")

// modo oscuro
botonDarkMode.addEventListener('click', () => {    
    document.body.classList.add('darkMode')
    localStorage.setItem("darkMode", "dark")
})

//modo claro
botonLightMode.addEventListener('click', () => {
    document.body.classList.remove('darkMode')
    localStorage.setItem("darkMode", "light")
})




// creacion de objeto reserva

class Reserva {
    constructor(nombre, telefono, email) {
        this.nombre = nombre
        this.telefono = telefono
        this.email= email
    }
}


// creacion array vacio reservas
let reservas = []

if (localStorage.getItem('reservas')) {
    reservas = JSON.parse(localStorage.getItem('reservas'))
} else {
    localStorage.setItem('reservas', JSON.stringify(reservas))
}


// llamando id de index

const boton = document.getElementById("boton")
const botonDos = document.getElementById("botonDos")
const form = document.getElementById("idForm")
const botonTareas = document.getElementById("botonTareas")
const divTareas = document.getElementById("divTareas")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)

    const reserva = new Reserva(datForm.get("nombre"), datForm.get("telefono"), datForm.get("email"))

    reservas.push(reserva)

    localStorage.setItem('reservas', JSON.stringify(reservas))

    form.reset()
})

// cuadros de alerta --------------------------------

function mostrarCarritoUno() {
    Swal.fire({
        title: 'Felicitaciones !',
        text: 'Realizaste tu reserva',
        imageUrl: 'img/canotaje.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'imagen canotaje',
      })
}

function mostrarCarritoDos() {
    Swal.fire({
        title: 'Felicitaciones !',
        text: 'Realizaste tu reserva',
        imageUrl: 'img/kayak.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'imagen kajak',
      })
}

// ---------------------------------------------------



// -----EVENTO BOTON AGREGAR AL CARRITO ----

boton.addEventListener('click', () => {
    mostrarCarritoUno()
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
       
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #2C5392, #203A80, #0F2050)",
            fontFamily: "Arial, Helvetica, sans-serif"
        },
        onClick: function () {
            mostrarCarrito()
        } 
    }).showToast();
})


// -----EVENTO click BOTON ----

botonDos.addEventListener('click', () => {
    mostrarCarritoDos()
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,        
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #2C5364, #203A80, #0F2050)",
            fontFamily: "Arial, Helvetica, sans-serif"
        },
        onClick: function () {
            mostrarCarrito()
        } 
    }).showToast();
})


// -----EVENTO BOTON ----
botonTareas.addEventListener('click', () => {
    const tarStorage = JSON.parse(localStorage.getItem('reservas'))


    // ADICIONANDO EL DOM
    divTareas.innerHTML = ""

    tarStorage.forEach((reserva, indice) => {
        divTareas.innerHTML += `
            <div class="card bg-light mb-3" id="reserva${indice}" style="max-width: 18rem;margin:3px;">
                <div class="card-header"><h2>${reserva.nombre}<h2></div>
                <div class="card-body">
                    <p class="card-text">${reserva.telefono}</p>
                    <p class="card-text">${reserva.email}</p>
                    <button class="btn btn-danger">Cancelar</button>
                </div>
            </div>        
        `
    })

    // eliminar reserva

    tarStorage.forEach((reserva, indice) => {
        const tarjetaTarea = document.getElementById(`reserva${indice}`)

        tarjetaTarea.children[1].children[2].addEventListener('click', () => {
            tarjetaTarea.remove() 
            reservas.splice(indice, 1) 
            localStorage.setItem('reservas', JSON.stringify(reservas)) 
            console.log(`${reserva.nombre} Eliminada`)
        })
    })
    
})


//--------------------FETCH ------------------------------------

//llamando a html
const divFetch = document.getElementById("divFetch")

//importando array desde actividades.json

fetch('./json/actividades.json')
.then(response => response.json() )
.then(actividades => {
    actividades.forEach((actividad, indice) =>{
        // adicionando dom 
        divFetch.innerHTML += `
        <div class="card" id="producto${indice}" style="width: 38rem;margin:3px;">
        <img src="./img/${actividad.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${actividad.actividad}</h5>
                <p class="card-text">Marca: ${actividad.descripcion}</p>
                <p class="card-text">Precio: $${actividad.costo}</p>
                
                <button class="btn">Seleccionar</button>
            </div>
        </div>        
        `        
    })
})



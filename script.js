class Reserva {
    constructor(nombre, telefono, email) {
        this.nombre = nombre
        this.telefono = telefono
        this.email= email
    }
}

let reservas = []

if (localStorage.getItem('reservas')) {
    reservas = JSON.parse(localStorage.getItem('reservas'))
} else {
    localStorage.setItem('reservas', JSON.stringify(reservas))
}

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



function mostrarCarritoUno() {
    Swal.fire({
        title: 'Felicitaciones !',
        text: 'Realizaste tu reserva',
        imageUrl: 'img/canotaje.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}

function mostrarCarritoDos() {
    Swal.fire({
        title: 'Felicitaciones !',
        text: 'Realizaste tu reserva',
        imageUrl: 'img/kayak.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}






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


botonTareas.addEventListener('click', () => {
    const tarStorage = JSON.parse(localStorage.getItem('reservas'))

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


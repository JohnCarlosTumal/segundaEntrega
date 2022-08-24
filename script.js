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


boton.addEventListener('click', () => {
    alert("Actividad seleccionada")
})

botonDos.addEventListener('click', () => {
    alert("Actividad seleccionada")
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
            tarjetaTarea.remove() //DOM
            reservas.splice(indice, 1) //Array
            localStorage.setItem('reservas', JSON.stringify(reservas)) //Local storage
            console.log(`${reserva.nombre} Eliminada`)
        })
    })
})


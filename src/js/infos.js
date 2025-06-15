informations = {
    mclaren: {
        titre: "McLaren 720s",
        annee: "2017-2022",
        moteur: "V8"
    },
    porsche: {
        titre: "Porsche 992 gt3rs",
        annee: "2022-",
        moteur: "flat-6"
    },
    bmw: {
        titre: "BMW M3 CS",
        annee: "2023-",
        moteur: "6 cylindres en ligne"
    },
    pagani: {
        titre: "Pagani Zonda R",
        annee: "2009",
        moteur: "V12"
    },
    maserati: {
        titre: "Maserati MC20",
        annee: "2020-",
        moteur: "V6"
    },
    lamborghini: {
        titre: "Lamborghini Revuelto",
        annee: "2023-",
        moteur: "V12"
    },
    mercedes: {
        titre: "Mercedes G63 AMG",
        annee: "2018-",
        moteur: "V8"
    },
    nissan: {
        titre: "Nissan 350z",
        annee: "2002-2009",
        moteur: "V6"
    }
}

function loadCarInfos(model) {
    document.querySelector("#titrevoit").innerText = informations[model].titre
    document.querySelector("#anneevoit").innerHTML = `<strong>années de production: ${informations[model].annee}</strong>`
    document.querySelector("#moteurvoit").innerHTML = `<strong>moteur: ${informations[model].moteur}</strong>`
}
document.addEventListener("DOMContentLoaded", () => {
    loadCarInfos("mclaren")
})

document.querySelectorAll(".boutonvoit").forEach(btn => {
    btn.addEventListener("click", () => {
        loadCarInfos(btn.getAttribute("data-model"))
    })
})
const MYAPIWEATHERKEY = "86c6bfee5a80a7b472540d3a11f69215"
const elHJust = document.querySelector(".just")
const elResult = document.querySelector(".hero-box__result")
const elWeathertemplate = document.querySelector(".weather-temp").content
const elForm=document.querySelector('.hero-box__form')
const elFormInput=document.querySelector('.hero-box__input')

const fragment = new DocumentFragment();

async function getWeatherDefaoult(lat) {
    try {
        const res = await fetch(lat)
        const data = await res.json()
        console.log(data);
        if (data.message=="city not found") {
            alert("Sorry this city is not found")
        }else{
            makeList(data)
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

function makeList(array) {


    elResult.innerHTML = ""

    let cloneTemplate = elWeathertemplate.cloneNode(true);

    cloneTemplate.querySelector(".result__loc-name").textContent = array.name
    cloneTemplate.querySelector(".result__temp").textContent = Math.round(array.main.temp)
    cloneTemplate.querySelector(".result__temp-dis").textContent = array.weather[0].main
    let beforpar = cloneTemplate.querySelector(".result__temp-box");

    changeImg(array.weather[0].id, beforpar, array)



    fragment.appendChild(cloneTemplate)
    elResult.appendChild(fragment)

}


function changeImg(id, beforpar, array) {
    if (id >= 801 && id <= 804) {
        beforpar.style.setProperty('--weather-rain', "url(/images/cloud-dark.svg)")
    } else if (id >= 600 && id <= 622) {
        beforpar.style.setProperty('--weather-rain', "url(/images/snowflake.png)")
    } else if (id == 800) {
        beforpar.style.setProperty('--weather-rain', "url(/images/sun.png)")
    } else if (id >= 701 && id <= 781) {
        beforpar.style.setProperty('--weather-rain', "url(/images/fog.png)")
    } else if (id >= 500 && id <= 531) {
        beforpar.style.setProperty('--weather-rain', "url(/images/rain-drops.png)")
    } else if (id >= 300 && id <= 321) {
        beforpar.style.setProperty('--weather-rain', "url(/images/thermometer.png)")
    }else if (id >= 200 &&id <= 232) {
        beforpar.style.setProperty('--weather-rain', "url(/images/storm.png)")
    }
}

navigator.geolocation.getCurrentPosition(function (position) {
    getWeatherDefaoult(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${MYAPIWEATHERKEY}`)
})


function deb(cb, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(cb, delay)
    }
}

function tes() {
    if (elFormInput.value.length > 0) {
        getWeatherDefaoult(`https://api.openweathermap.org/data/2.5/weather?q=${elFormInput.value}&units=metric&appid=${MYAPIWEATHERKEY}`)

    }
}


elForm.addEventListener("keyup", deb(tes, 2000))
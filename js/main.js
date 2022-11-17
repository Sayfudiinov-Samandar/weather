const MYAPIWEATHERKEY = "86c6bfee5a80a7b472540d3a11f69215"
const elHJust = document.querySelector(".just")
const elResult = document.querySelector(".hero-box__result")
const elResultFirst = document.querySelector(".hero-box__result-first")
const elResultLast = document.querySelector(".hero-box__result-last")


const elWeathertemplate = document.querySelector(".weather-temp").content
const elForm = document.querySelector('.hero-box__form')
const elFormInput = document.querySelector('.hero-box__input')

const fragment = new DocumentFragment();
const fragmentFirst = new DocumentFragment();
const fragmentLAst = new DocumentFragment();


let twoCountryfirst = []
let twoCountrylast = []




async function getWeatherDefaoult(lat) {
    try {
        const res = await fetch(lat)
        const data = await res.json()
        if (data.message == "city not found") {
            alert("Sorry this city is not found")
        } else {
            makeList([data])
 
        }
    } catch (error) {
        console.log(error);
    }
}

async function getWeatherDefaoultFirst(lat) {
    try {
        const res = await fetch(lat)
        const data = await res.json()
        if (data.message == "city not found") {
            alert("Sorry this city is not found")
        }else{
            twoCountryfirst.push(data)
        }

        if(twoCountryfirst.length==2) {
            makeListothersFirst(twoCountryfirst)
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function getWeatherDefaoultlast(lat) {
    try {
        const res = await fetch(lat)
        const data = await res.json()
        if (data.message == "city not found") {
            alert("Sorry this city is not found")
        }else{
            twoCountrylast.push(data)
        }

        if(twoCountrylast.length==2) {
            makeListotherslast(twoCountrylast)
        }
        
    } catch (error) {
        console.log(error);
    }
}




function makeListothersFirst(array) {
    elResultFirst.innerHTML = ""

    array.forEach(elm => {
        let a =(new Date(elm.dt * 1000));

        let cloneTemplate = elWeathertemplate.cloneNode(true);
        cloneTemplate.querySelector(".result__loc-name").textContent = elm.name
        cloneTemplate.querySelector(".result__now-time").textContent = a.toString().slice(3,10)

        cloneTemplate.querySelector(".result__temp").textContent = Math.round(elm.main.temp)
        cloneTemplate.querySelector(".result__temp-dis").textContent = elm.weather[0].main
        let beforpar = cloneTemplate.querySelector(".result__temp-box");
        changeImg(elm.weather[0].id, beforpar, array)
        fragmentFirst.appendChild(cloneTemplate)
    });
    elResultFirst.appendChild(fragmentFirst)
}
function makeListotherslast(array) {
    elResultLast.innerHTML = ""

    array.forEach(elm => {
        let a =(new Date(elm.dt * 1000));
        let cloneTemplate = elWeathertemplate.cloneNode(true);
        cloneTemplate.querySelector(".result__loc-name").textContent = elm.name
        cloneTemplate.querySelector(".result__now-time").textContent = a.toString().slice(3,10)

        cloneTemplate.querySelector(".result__temp").textContent = Math.round(elm.main.temp)
        cloneTemplate.querySelector(".result__temp-dis").textContent = elm.weather[0].main
        let beforpar = cloneTemplate.querySelector(".result__temp-box");
        changeImg(elm.weather[0].id, beforpar, array)
        fragmentLAst.appendChild(cloneTemplate)
    });
    elResultLast.appendChild(fragmentLAst)
}



function makeList(array) {
    elResult.innerHTML = ""

    array.forEach(elm => {
        let a =(new Date(elm.dt * 1000));
        let cloneTemplate = elWeathertemplate.cloneNode(true);
        cloneTemplate.querySelector(".result__loc-name").textContent = elm.name
        cloneTemplate.querySelector(".result__now-time").textContent = a.toString().slice(3,10)

        cloneTemplate.querySelector(".result__temp").textContent = Math.round(elm.main.temp)
        cloneTemplate.querySelector(".result__temp-dis").textContent = elm.weather[0].main
        let beforpar = cloneTemplate.querySelector(".result__temp-box");
        changeImg(elm.weather[0].id, beforpar, array)
        fragment.appendChild(cloneTemplate)

    });

    elResult.appendChild(fragment)
}



for (let index = 0; index <= 5; index++) {
    if (index==1) {
        getWeatherDefaoultFirst(`https://api.openweathermap.org/data/2.5/weather?q=angren&units=metric&appid=${MYAPIWEATHERKEY}`)
    }else if (index==2) {
        getWeatherDefaoultFirst(`https://api.openweathermap.org/data/2.5/weather?q=andijon&units=metric&appid=${MYAPIWEATHERKEY}`)
    }
    
    else if(index==3){
        getWeatherDefaoultlast(`https://api.openweathermap.org/data/2.5/weather?q=termiz&units=metric&appid=${MYAPIWEATHERKEY}`)
    }else if(index==4){
        getWeatherDefaoultlast(`https://api.openweathermap.org/data/2.5/weather?q=saman&units=metric&appid=${MYAPIWEATHERKEY}`)
    }

}

function changeImg(id, beforpar) {
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
    } else if (id >= 200 && id <= 232) {
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
        elResultFirst.innerHTML=""
        elResultLast.innerHTML=""
        getWeatherDefaoult(`https://api.openweathermap.org/data/2.5/weather?q=${elFormInput.value}&units=metric&appid=${MYAPIWEATHERKEY}`)
  
    }
}

elForm.addEventListener("keyup", deb(tes, 2000))
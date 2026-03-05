const MYAPIWEATHERKEY = "86c6bfee5a80a7b472540d3a11f69215";

const elResult = document.querySelector(".hero-box__result");
const elResultFirst = document.querySelector(".hero-box__result-first");
const elResultLast = document.querySelector(".hero-box__result-last");

const elWeathertemplate = document.querySelector(".weather-temp").content;
const elForm = document.querySelector(".hero-box__form");
const elFormInput = document.querySelector(".hero-box__input");

let twoCountryfirst = [];
let twoCountrylast = [];


async function getWeather(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.message === "city not found") {
            alert("Sorry this city is not found");
            return;
        }

        makeList([data]);

    } catch (error) {
        console.log(error);
    }
}

async function getWeatherFirst(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.message !== "city not found") {
            twoCountryfirst.push(data);
        }

        if (twoCountryfirst.length === 2) {
            makeListothersFirst(twoCountryfirst);
        }

    } catch (error) {
        console.log(error);
    }
}

async function getWeatherLast(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.message !== "city not found") {
            twoCountrylast.push(data);
        }

        if (twoCountrylast.length === 2) {
            makeListothersLast(twoCountrylast);
        }

    } catch (error) {
        console.log(error);
    }
}


function createWeatherCard(elm) {

    const clone = elWeathertemplate.cloneNode(true);

    let date = new Date(elm.dt * 1000);

    clone.querySelector(".result__loc-name").textContent = elm.name;
    clone.querySelector(".result__now-time").textContent = date.toString().slice(3, 10);
    clone.querySelector(".result__temp").textContent = Math.round(elm.main.temp);
    clone.querySelector(".result__temp-dis").textContent = elm.weather[0].main;

    const box = clone.querySelector(".result__temp-box");

    changeImg(elm.weather[0].id, box);

    return clone;
}



function makeList(array) {

    elResult.innerHTML = "";
    const fragment = document.createDocumentFragment();

    array.forEach(elm => {
        fragment.appendChild(createWeatherCard(elm));
    });

    elResult.appendChild(fragment);
}

function makeListothersFirst(array) {

    elResultFirst.innerHTML = "";
    const fragment = document.createDocumentFragment();

    array.forEach(elm => {
        fragment.appendChild(createWeatherCard(elm));
    });

    elResultFirst.appendChild(fragment);
}

function makeListothersLast(array) {

    elResultLast.innerHTML = "";
    const fragment = document.createDocumentFragment();

    array.forEach(elm => {
        fragment.appendChild(createWeatherCard(elm));
    });

    elResultLast.appendChild(fragment);
}


function changeImg(id, box) {

    if (id >= 801 && id <= 804) {
        box.style.setProperty('--weather-rain', "url(/images/cloud-dark.svg)");

    } else if (id >= 600 && id <= 622) {
        box.style.setProperty('--weather-rain', "url(/images/snowflake.png)");

    } else if (id === 800) {
        box.style.setProperty('--weather-rain', "url(/images/sun.png)");

    } else if (id >= 701 && id <= 781) {
        box.style.setProperty('--weather-rain', "url(/images/fog.png)");

    } else if (id >= 500 && id <= 531) {
        box.style.setProperty('--weather-rain', "url(/images/rain-drops.png)");

    } else if (id >= 300 && id <= 321) {
        box.style.setProperty('--weather-rain', "url(/images/thermometer.png)");

    } else if (id >= 200 && id <= 232) {
        box.style.setProperty('--weather-rain', "url(/images/storm.png)");
    }
}



navigator.geolocation.getCurrentPosition((position) => {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${MYAPIWEATHERKEY}`;

    getWeather(url);

});



getWeatherFirst(`https://api.openweathermap.org/data/2.5/weather?q=angren&units=metric&appid=${MYAPIWEATHERKEY}`);

getWeatherFirst(`https://api.openweathermap.org/data/2.5/weather?q=andijon&units=metric&appid=${MYAPIWEATHERKEY}`);

getWeatherLast(`https://api.openweathermap.org/data/2.5/weather?q=termiz&units=metric&appid=${MYAPIWEATHERKEY}`);

getWeatherLast(`https://api.openweathermap.org/data/2.5/weather?q=saman&units=metric&appid=${MYAPIWEATHERKEY}`);



function debounce(cb, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            cb.apply(this, args);
        }, delay);
    };
}


function searchCity() {

    const city = elFormInput.value.trim();

    if (city.length > 0) {

        elResultFirst.innerHTML = "";
        elResultLast.innerHTML = "";

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${MYAPIWEATHERKEY}`;

        getWeather(url);
    }
}



elForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

elFormInput.addEventListener("keyup", debounce(searchCity, 800));

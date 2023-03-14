const BASE_URL = 'https://restcountries.com/v3.1';

//функція робить HTTP-запит на ресурс і повертає проміс з масивом країн 

export const fetchCountries = function(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
};



// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages
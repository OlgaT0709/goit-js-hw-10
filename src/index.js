import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import countryInfoTpl from './markupcountryinfo';
import countryListTpl from './markupcoutrylist';

const DEBOUNCE_DELAY = 300;

refs = {
    inputCountry: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

// HTTP-запити виконуються при введенні назви країни після зупинкив 300мс
refs.inputCountry.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
    clearMarkup(); // стартово прибираємо розмітку
    const country = event.target.value.trim();// прибираються зайві пробіли

    fetchCountries(country)  
        .then(renderMarkup) // перевіряємо кількість краін і додаємо розмітку
        .catch(onError);// якщо краіни не існує, виводимо інфо про це
};

function renderMarkup(country) {
// Якщо більше 10 краін, то виводимо інфо, що потрібне більш специфічна назва
    if(country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
        }
// Якщо це одна краіна, виводимо по ній інфо
    if (country.length === 1) {
        const markup = countryInfoTpl(country);
        refs.countryInfo.innerHTML = markup;
        return;
    };
// Якщо це від 2 до 9 краін, виводимо список країн
    if (country.length > 1 && country.length <= 10) {
        const markup = countryListTpl(country);
        refs.countryList.insertAdjacentHTML('beforeend', markup)
    }
}

function onError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");

};

function clearMarkup() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};
    

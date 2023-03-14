import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries, } from './fetchCountries';
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
    clearMarkup();
    // прибираються зайві пробіли
    const country = event.target.value.trim();

    fetchCountries(country)
        .then(country => {
            checkCountryAmount(country);
            renderCountryInfo(country);          
        })
        // якщо краіни не існує, виводимо інфо проце
        .catch(onError);
};

function renderCountryInfo(country) {
// Якщо це одна краіна, виводимо по ній інфо
    if (country.length === 1) {
        Notiflix.Notify.info(' 1 country ')
        const markup = countryInfoTpl(country);
        refs.countryInfo.innerHTML = markup;
        return;
    };
// Якщо це від 2 до 9 краін, виводимо список країн
    if (country.length > 1 && country.length <= 10) {
        Notiflix.Notify.info('many countries');
        const markup = countryListTpl(country);
        refs.countryList.insertAdjacentHTML('beforeend', markup)
    }
}


// Якщо більше 10 краін, то потрібне більш специфічна назва
function checkCountryAmount(country) {
    if(country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
        };
}

function onError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");

};

function clearMarkup() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};
    

export default function countryInfoTpl(country) {
    const { name: { official }, flags: { svg }, capital, population, languages } = country[0];

    const lang = Object.values(languages).join(", ");
    
    return `
    <div >
        <img class=country-info__flag src=${svg} alt="flag of ${official}" width=50 height=35 >
        <p class=country-info__name> ${official}
    </div>
    <ul class=country-info__card>
        <li>
            Capital: ${capital}
        </li>
        <li>
            Population: ${population}
        </li>
        <li>
            Languages:  ${lang}
        </li>
    <ul>
    `;
}
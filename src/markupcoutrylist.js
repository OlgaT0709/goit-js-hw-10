export default function countryListTpl(country) {
  return country
    .map(
      ({ name: { official }, flags: { svg } }) => `
      <li class="country-list__item">
        <img class="country__flag" src="${svg}" alt="flag of ${official}" width="35" height="20">
        <p class="country__name">${official}</p>
      </li>
    `
    )
    .join("");
}
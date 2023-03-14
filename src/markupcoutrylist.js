export default function countryListTpl(country) {
  return country
    .map(
      ({ name: { official }, flags: { svg } }) => `
      <li class="country-list-item">
        <img class="flag-img" src="${svg}" alt="flag of ${official}" width="35" height="20">
        <p class="card-name">${official}</p>
      </li>
    `
    )
    .join("");
}
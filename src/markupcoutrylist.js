import markUpTpl from './markupcountrylist.hbs'

export default function countryListTpl(country) {
  return country.map(({ name: { official }, flags: { svg } }) => markUpTpl({ official, svg })).join("");
}


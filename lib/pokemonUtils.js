export function getPokemonId(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

export function buildPokemonImageUrl(pokemonUrl) {
  const id = getPokemonId(pokemonUrl);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export const formatStatName = (name) => {
  const words = name.split('-');
  let result = '';
  for (let i = 0; i < words.length; i++) {
    result += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    if (i < words.length - 1) result += ' ';
  }
  return result;
};

export function convertToMeters(decimeters) {
  return (decimeters / 10).toFixed(1);
}

export function convertToKilograms(hectograms) {
  return (hectograms / 10).toFixed(1);
}

export function filterPokemonByName(pokemonArray, searchQuery) {
  if (!searchQuery) return pokemonArray;
  return pokemonArray.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

export function calculateStatPercentage(statValue) {
  const percentage = (statValue / 150) * 100;
  return percentage > 100 ? 100 : percentage;
}

export function getStatColorClass(value) {
  if (value >= 100) return 'bg-green-500';
  if (value >= 75) return 'bg-blue-500';
  if (value >= 50) return 'bg-yellow-500';
  return 'bg-orange-500';
}

export const paginateArray = (array, page, itemsPerPage) => {
  const start = (page - 1) * itemsPerPage;
  return array.slice(start, start + itemsPerPage);
};

export function getTotalPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}

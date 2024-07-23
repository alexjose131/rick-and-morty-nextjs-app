export const fetchCharacters = async () => {
  return await fetch("https://rickandmortyapi.com/api/character?page=1");
};

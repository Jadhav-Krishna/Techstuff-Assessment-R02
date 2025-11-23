import { useState, useEffect } from 'react';

export function usePokemonData(limit = 150) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();
        setPokemon(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    getData();
  }, [limit]);

  return { pokemon, loading, error };
}

export function usePokemonDetails(selected) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selected) {
      setDetails(null);
      return;
    }

    async function getDetails() {
      setLoading(true);
      try {
        const response = await fetch(selected.url);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    getDetails();
  }, [selected]);

  return { details, loading };
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

function EvolutionChain({ pokemonName }) {
  const [chain, setChain] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvolution() {
      try {
        setLoading(true);
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        const speciesData = await speciesResponse.json();
        const chainResponse = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainResponse.json();
        
        const evolutions = [];
        let current = chainData.chain;
        evolutions.push(current.species.name);
        
        while (current.evolves_to && current.evolves_to.length > 0) {
          current = current.evolves_to[0];
          evolutions.push(current.species.name);
        }
        
        setChain(evolutions);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchEvolution();
  }, [pokemonName])

  if (loading) {
    return <p className="text-slate-400">Loading evolution chain...</p>;
  }

  if (chain.length === 0) {
    return <p className="text-slate-400">No evolution data available</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4">
      {chain.map((name, index) => (
        <div key={name + index} className="flex items-center gap-2 md:gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-4 text-center">
              <p className="text-slate-100 capitalize font-semibold text-sm">{name}</p>
            </CardContent>
          </Card>
          {index < chain.length - 1 && <ArrowRight className="text-slate-500 w-5 h-5 flex-shrink-0" />}
        </div>
      ))}
    </div>
  )
}

export default EvolutionChain;

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { buildPokemonImageUrl } from "@/lib/pokemonUtils"

function PokemonGrid({ pokemon, onSelect, selectedPokemon }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {pokemon.map((p, idx) => {
        const imgUrl = buildPokemonImageUrl(p.url);
        const selected = selectedPokemon?.name === p.name;
        
        return (
          <Card
            key={p.name + idx}
            onClick={() => onSelect(p)}
            className={"cursor-pointer transition hover:shadow-lg " + 
              (selected ? "ring-2 ring-blue-500 bg-blue-900 bg-opacity-20" : "hover:bg-slate-700")}
          >
            <CardContent className="pt-4">
              <div className="text-center space-y-2">
                <span className="text-slate-400 text-xs block">#{idx + 1}</span>
                <img
                  src={imgUrl}
                  alt={p.name}
                  className="w-20 h-20 mx-auto"
                  onError={(e) => e.target.src = "/diverse-pokemon-gathering.png"}
                />
                <p className="text-slate-100 capitalize font-semibold text-sm">{p.name}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}

export default PokemonGrid;

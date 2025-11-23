"use client"

import { Badge } from "@/components/ui/badge"
import { convertToMeters, convertToKilograms } from "@/lib/pokemonUtils"

function PokemonDetails({ details }) {
  if (!details) return null;

  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`;
  const height = convertToMeters(details.height);
  const weight = convertToKilograms(details.weight);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={imgUrl}
            alt={details.name}
            className="w-40 h-40 mx-auto md:mx-0"
            onError={(e) => e.target.src = "/diverse-pokemon-gathering.png"}
          />
        </div>

        <div className="flex-1 space-y-4">
          <section>
            <h3 className="text-slate-400 text-xs uppercase tracking-wide">Type</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {details.types.map((t) => (
                <Badge key={t.type.name} variant="secondary" className="capitalize">
                  {t.type.name}
                </Badge>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-slate-400 text-xs uppercase tracking-wide">Height</h3>
              <p className="text-slate-100 font-semibold mt-1">{height} m</p>
            </div>
            <div>
              <h3 className="text-slate-400 text-xs uppercase tracking-wide">Weight</h3>
              <p className="text-slate-100 font-semibold mt-1">{weight} kg</p>
            </div>
          </section>

          <section>
            <h3 className="text-slate-400 text-xs uppercase tracking-wide">Abilities</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {details.abilities.map((ability) => (
                <Badge key={ability.ability.name} variant="outline" className="capitalize">
                  {ability.ability.name.replace("-", " ")}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails;

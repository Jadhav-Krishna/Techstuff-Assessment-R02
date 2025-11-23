"use client"

import { getStatColorClass, calculateStatPercentage, formatStatName } from "@/lib/pokemonUtils"

function PokemonStats({ stats }) {
  return (
    <div className="space-y-4">
      {stats.map((stat) => {
        const name = formatStatName(stat.stat.name);
        const value = stat.base_stat;
        const color = getStatColorClass(value);
        const width = calculateStatPercentage(value);

        return (
          <div key={stat.stat.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 capitalize text-sm">{name}</span>
              <span className="text-slate-100 font-semibold text-sm">{value}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${color} transition-all duration-300`}
                style={{ width: width + '%' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default PokemonStats;

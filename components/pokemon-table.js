"use client"

function PokemonTable({ pokemon, onSelect, selectedPokemon }) {
  const handleClick = (e, poke) => {
    e.stopPropagation();
    onSelect(poke);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-700 bg-slate-800">
            <th className="px-4 py-3 text-slate-300 font-semibold">#</th>
            <th className="px-4 py-3 text-slate-300 font-semibold">Name</th>
            <th className="px-4 py-3 text-slate-300 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p, i) => {
            const isActive = selectedPokemon?.name === p.name;
            const rowClass = "border-b border-slate-700 hover:bg-slate-700 transition cursor-pointer " + 
              (isActive ? "bg-blue-900 bg-opacity-30" : "");
            
            return (
              <tr key={p.name} className={rowClass} onClick={() => onSelect(p)}>
                <td className="px-4 py-3 text-slate-400">#{i + 1}</td>
                <td className="px-4 py-3 text-slate-100 capitalize font-medium">{p.name}</td>
                <td className="px-4 py-3">
                  <button onClick={(e) => handleClick(e, p)} className="text-blue-400 hover:text-blue-300 transition text-xs">
                    View →
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PokemonTable;

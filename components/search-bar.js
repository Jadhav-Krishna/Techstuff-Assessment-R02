"use client"

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
      />
    </div>
  )
}

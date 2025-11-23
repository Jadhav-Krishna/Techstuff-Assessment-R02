"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import PokemonTable from "@/components/pokemon-table"
import PokemonDetails from "@/components/pokemon-details"
import PokemonGrid from "@/components/pokemon-grid"
import PokemonStats from "@/components/pokemon-stats"
import EvolutionChain from "@/components/evolution-chain"

function PokePage() {
  const itemsPerPage = 10;
  const pokemonLimit = 150;

  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [pokemonDetails, setPokemonDetails] = useState(null)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}`);
        const data = await response.json();
        setAllPokemon(data.results);
        setFilteredPokemon(data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data");
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [])

  useEffect(() => {
    if (!selectedPokemon) return;

    async function getDetails() {
      try {
        const response = await fetch(selectedPokemon.url);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getDetails();
  }, [selectedPokemon])

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    const filtered = allPokemon.filter(p => 
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIdx, endIdx);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md bg-red-950 border-red-800">
          <CardContent className="pt-6">
            <p className="text-red-200 text-center">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
              <p className="text-slate-400">Loading Pokémon data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const goToPage = (dir) => {
    if (dir === 'prev' && page > 1) {
      setPage(page - 1);
    } else if (dir === 'next' && page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100">Pokémon Data Explorer</h1>
          <p className="text-slate-400">Explore and analyze Pokémon with detailed statistics</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search Pokémon by name..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500 h-10"
            />
          </div>
          <Badge variant="secondary" className="h-10 flex items-center px-4">
            {filteredPokemon.length} results
          </Badge>
        </div>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pokémon List</CardTitle>
              </CardHeader>
              <CardContent>
                <PokemonTable
                  pokemon={currentPokemon}
                  onSelect={setSelectedPokemon}
                  selectedPokemon={selectedPokemon}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => goToPage('prev')}
                  disabled={page === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => goToPage('next')}
                  disabled={page === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grid" className="space-y-4">
            <PokemonGrid pokemon={currentPokemon} onSelect={setSelectedPokemon} selectedPokemon={selectedPokemon} />

            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => goToPage('prev')}
                  disabled={page === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => goToPage('next')}
                  disabled={page === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            {selectedPokemon && pokemonDetails ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <PokemonTable
                    pokemon={currentPokemon}
                    onSelect={setSelectedPokemon}
                    selectedPokemon={selectedPokemon}
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="capitalize">{pokemonDetails.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="stats">Stats</TabsTrigger>
                          <TabsTrigger value="evolution">Evolution</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="mt-4">
                          <PokemonDetails details={pokemonDetails} />
                        </TabsContent>

                        <TabsContent value="stats" className="mt-4">
                          <PokemonStats stats={pokemonDetails.stats} />
                        </TabsContent>

                        <TabsContent value="evolution" className="mt-4">
                          <EvolutionChain pokemonName={pokemonDetails.name} />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-center">Select a Pokémon to view details</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PokePage;

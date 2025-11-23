import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Grid3x3, BarChart3, Zap } from "lucide-react"

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-12">
        <section className="space-y-6 text-center">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 inline-block">
              <p className="text-blue-300 text-sm font-semibold">Welcome to Pokémon Explorer</p>
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 leading-tight">
            Explore Pokémon Data Like Never Before
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Dive into comprehensive Pokémon statistics, detailed information, and evolution chains. A powerful data exploration tool built for trainers and analysts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="/poke">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base">
                Start Exploring
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-100 hover:bg-slate-700 px-8 h-12 text-base bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Grid3x3 className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle className="text-slate-100">Multiple Views</CardTitle>
              <CardDescription className="text-slate-400">Switch between table, grid, and comparison views</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle className="text-slate-100">Detailed Stats</CardTitle>
              <CardDescription className="text-slate-400">Analyze complete statistics and base attributes</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-500 mb-2" />
              <CardTitle className="text-slate-100">Evolution Chains</CardTitle>
              <CardDescription className="text-slate-400">Explore evolution paths and transformations</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to explore?</h2>
          <p className="text-blue-100 text-lg mb-6">
            Access all 150 Pokémon with comprehensive data and advanced filtering.
          </p>
          <a href="/poke">
            <Button className="bg-white hover:bg-slate-100 text-blue-600 px-8 h-12 font-semibold">
              Launch Explorer
            </Button>
          </a>
        </section>
      </div>
    </div>
  )
}

export default Home;

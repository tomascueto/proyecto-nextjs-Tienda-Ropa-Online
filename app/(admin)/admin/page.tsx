import { fetchOverviewCardsData } from "@/app/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/admin/card"
import { Package, Users, Grid3x3, Tag } from "lucide-react"

export default async function AdminOverview() {
  const { numberOfUsers, numberOfProducts, numberOfCategories, numberOfBrands } = await fetchOverviewCardsData()

  const cards = [
    {
      title: "Cantidad de Productos",
      value: numberOfProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Cantidad de Usuarios",
      value: numberOfUsers,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cantidad de Categorías",
      value: numberOfCategories,
      icon: Grid3x3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Cantidad de Marcas",
      value: numberOfBrands,
      icon: Tag,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen general de la tienda</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value?.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

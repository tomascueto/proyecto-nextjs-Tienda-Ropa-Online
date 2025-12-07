import { fetchCategoryById } from '@/app/lib/data'
import EditCategoryForm from '@/app/ui/categories/edit-form'
import { notFound } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/app/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function Page( {params} : {params : {id:string} } ){
    const id = params.id
    const category = await fetchCategoryById(id)

    if(!category){
      notFound();
    }
  
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Link href="/admin/categories">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a categorías
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Editar Categoría</h1>
          </div>
          
          <EditCategoryForm category={category}/>
        </div>
      </div>
    )
}
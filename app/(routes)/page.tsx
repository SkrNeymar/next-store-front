import Container from "@/components/ui/Container"
import Billboard from "@/components/Billboard"
import ProductList from "@/components/ProductList"
import getBillboard from "@/actions/getBillboard"
import getProducts from "@/actions/getProducts"

export const revalidate = 0

const HomePage = async () => {
  const billboard = {
    id: "caf1251d-23bc-445b-a7d7-8de043ee6f72",
    storeId: "3d6cb075-fda3-4fd2-a247-1cb7d8c2558a",
    label: "New Arrival",
    imageUrl:
      "https://res.cloudinary.com/djhhzsnda/image/upload/v1708415454/qu5jgakkj4gnjbmnztza.jpg",
    createdAt: "2024-02-20T07:51:20.625Z",
    updatedAt: "2024-02-20T07:51:20.625Z",
  }

  const products = await getProducts({ isFeatured: true })
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage

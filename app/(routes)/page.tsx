import Container from "@/components/ui/Container"
import Billboard from "@/components/Billboard"
import ProductList from "@/components/ProductList"
import getBillboard from "@/actions/getBillboard"
import getProducts from "@/actions/getProducts"

export const revalidate = 0

const HomePage = async () => {
  const billboard = await getBillboard("7d2146c8-8fd1-4c9c-b843-0cf330aa4d07")
  const products = await getProducts({ isFeatured: true })
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  )
}

export default HomePage

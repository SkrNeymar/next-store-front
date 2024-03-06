import { ProductVariant } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product`

const getProductVariant = async (id: string): Promise<ProductVariant> => {
  const res = await fetch(`${URL}/${id}`)
  return res.json()
}

export default getProductVariant

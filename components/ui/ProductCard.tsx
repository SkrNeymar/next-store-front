"use client"

import { Product } from "@/types"
import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import Currency from "@/components/ui/Currency"
import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      {/* Images And Actions */}
      <div className="relative aspect-square rounded-xl bg-gray-100">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Image"
          className="object-cover rounded-md aspect-square"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={() => {}}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {}}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div>
        <p className="text-lg font-semibold">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price */}
      <div className="flex justify-between items-center">
        <Currency value={data.price} />
      </div>
    </div>
  )
}

export default ProductCard

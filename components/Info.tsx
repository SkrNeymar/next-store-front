"use client"

import { Color, Product, Size } from "@/types"
import Currency from "@/components/ui/Currency"
import Button from "./ui/Button"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

interface InfoProps {
  data: Product
  sizes: Size[]
  colors: Color[]
}

const Info: React.FC<InfoProps> = ({ data, sizes, colors }) => {
  const [selectedSizeId, setSelectedSizeId] = useState("")
  const [selectedColorId, setSelectedColorId] = useState("")

  const sizeToColorsMap = new Map()
  const colorToSizesMap = new Map()

  data.variants.forEach((variant) => {
    if (variant.quantity > 0) {
      if (!sizeToColorsMap.has(variant.sizeId)) {
        sizeToColorsMap.set(variant.sizeId, new Set())
      }
      sizeToColorsMap.get(variant.sizeId).add(variant.colorId)

      if (!colorToSizesMap.has(variant.colorId)) {
        colorToSizesMap.set(variant.colorId, new Set())
      }
      colorToSizesMap.get(variant.colorId).add(variant.sizeId)
    }
  })

  const handleSizeSelection = (sizeId: string) => {
    if (sizeId === selectedSizeId) {
      setSelectedSizeId("")
      setSelectedColorId("")
    } else {
      setSelectedSizeId(sizeId)
      const colors = sizeToColorsMap.get(sizeId)

      // Set the first color as selected
      // if (colors && colors.size > 0) {
      //   setSelectedColorId(colors.values().next().value)
      // }
    }
  }

  const handleColorSelection = (colorId: string) => {
    if (colorId === selectedColorId) {
      setSelectedColorId("")
      setSelectedSizeId("")
    } else {
      setSelectedColorId(colorId)
      const sizes = colorToSizesMap.get(colorId)

      // Set the first size as selected
      // if (sizes && sizes.size > 0) {
      //   setSelectedSizeId(sizes.values().next().value)
      // }
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex justify-between items-end">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div className="flex gap-x-2 font-medium">
            {sizes
              .filter((size) => {
                if (selectedColorId) {
                  const matchedSizes = colorToSizesMap.get(selectedColorId)
                  return matchedSizes && matchedSizes.has(size.id)
                }
                // If no color is selected, show all sizes
                return true
              })
              .map((size) => (
                <button
                  key={size.id}
                  className={`px-3 py-1 border rounded-md ${
                    selectedSizeId === size.id
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSizeSelection(size.id)}
                >
                  {size.name}
                </button>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4 mt-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="flex gap-x-3">
            {colors
              .filter((color) => {
                if (selectedSizeId) {
                  const matchedColors = sizeToColorsMap.get(selectedSizeId)
                  return matchedColors && matchedColors.has(color.id)
                }
                // If no size is selected, show all colors
                return true
              })
              .map((color) => (
                <div
                  key={color.id}
                  className={`h-6 w-6 rounded-full border border-gray-600 cursor-pointer ${
                    selectedColorId === color.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelection(color.id)}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Add To Cart <ShoppingCart />
        </Button>
      </div>
    </div>
  )
}

export default Info

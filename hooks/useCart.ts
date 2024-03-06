import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ProductVariant } from "@/types"
import toast from "react-hot-toast"
import getProductVariant from "@/actions/getProductVariant"

interface CartStore {
  items: ProductVariant[]
  addItem: (variantId: string | null) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: async (variantId: string | null) => {
        if (!variantId) {
          return toast.error("Please select variant")
        }

        try {
          const variantData = await getProductVariant(variantId)

          const currentItems = get().items
          const exitingItem = currentItems.find(
            (item) => item.id === variantData.id
          )

          if (exitingItem) {
            return toast.error("Item already in cart")
          }

          set({ items: [...currentItems, variantData] })
          toast.success("Item added to cart")
        } catch (error) {
          console.error(error)
          return toast.error("Failed to add item to cart")
        }
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] })
        toast.success("Item removed from cart")
      },

      removeAll: () => {
        set({ items: [] })
        toast.success("Cart cleared!")
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCart

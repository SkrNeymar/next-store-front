import { create } from 'zustand'

import { Product } from '@/types'

interface CartStore {
  items: Product[]
  addItem: (item: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

const useCart = create()

export default useCart

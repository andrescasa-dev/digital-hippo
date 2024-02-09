import { Product } from '@/payload-types'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

type Cart = {
  items : Product[]
  addItem : (item: Product) => {alreadyInCart: boolean}
  removeItem : (itemId: string) => void
  clear: () => void
}

export const useCart = create<Cart>()(
    persist(
      (set)=>({
        items: [],
        addItem: (item)=>{
          let alreadyInCart = false
          set(state=>{
            alreadyInCart = !!state.items.find(i => i.id === item.id)
            return alreadyInCart ? state : {items: [...state.items, item]} 
          })
          return { alreadyInCart }
        },
        removeItem: (itemId)=>{
          set(state => {
            return {items: state.items.filter(item => item.id !== itemId)}
          })
        },
        clear: ()=>{
          set({items: []})
        }
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
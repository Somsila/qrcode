import type { CartItem } from "./cartmodel"

export interface HistoryCartModel{
  id: number
  item: CartItem[]
}

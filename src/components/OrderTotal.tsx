import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalProps = {
    order: OrderItem[]
    tip: number
    dispatch: React.Dispatch<OrderActions>
}
export default function OrderTotal({order, tip, dispatch} : OrderTotalProps) {

    const subtotal = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ) , [order]); 
    const propina = useMemo(() => subtotal * tip, [tip, order]);
    const total = useMemo(() => subtotal + propina, [subtotal, propina]);

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
                <p>Subtotal a pagar:
                    <span className="font-bold">{formatCurrency(subtotal)}</span>
                </p>

                <p>Propina:
                    <span className="font-bold">{formatCurrency(propina)}</span>
                </p>

                <p>Total a pagar:
                    <span className="font-bold">{formatCurrency(total)}</span>
                </p>
                
            </div>

            <button 
                className="w-full bg-black uppercase text-white p-3 font-bold mt-10 disabled:opacity-20"
                disabled={total === 0}
                onClick={() => dispatch({type: 'place-order'})}
            >               
                Guardar Orden
            </button>
        </>
    )
}

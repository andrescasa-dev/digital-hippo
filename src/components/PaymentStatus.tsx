'use client'

import { trpc } from "@/trpc/client"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'

function PaymentStatus({email,_isPayed, orderId}: {email: string,_isPayed: boolean, orderId:string}) {
  const router = useRouter()
  
  const {data} = trpc.payment.pollOrderStatus.useQuery({orderId}, {
    enabled: _isPayed === false,
    refetchInterval: (data) => data?.isPaid ? false : 1000,
  })

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  return (
    <section className="flex justify-between text-sm text-gray-600">
        <div>
          <h4 className="font-medium text-gray-900">
            Shipping To
          </h4>
          <p>{email}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">
            Order Status
          </h4>
          <p>{_isPayed ? "idk" : "Pending payment"}</p>
        </div>
    </section>
  )
}

export default PaymentStatus
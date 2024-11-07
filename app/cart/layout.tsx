//ruta: app/cart/layout.tsx

import Header from "@/components/header"

export default function CartLayout({children} : {children: React.ReactNode}) {
    return (
      <section className="bg-gray-200 w-full h-screen">
        {
            <Header></Header>
        }
        {children}
      </section>
    )
  }
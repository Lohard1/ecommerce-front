import { CartContextProvider } from "./CartContext";
import Header from "./header";

export default function Layout ({children} : {children: React.ReactNode}) {
    return(
            <CartContextProvider>
            <Header></Header>
            {children}
            </CartContextProvider>
     )
}
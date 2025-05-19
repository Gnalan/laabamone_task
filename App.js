import Routes from './App/Navigation/Routes'
import { CartProvider } from './App/Utilities/CartProvider'
const App = () => {
  return (
    <CartProvider>
      <Routes />
      </CartProvider>     
  )

}
export default App




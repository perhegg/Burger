import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder/>
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;

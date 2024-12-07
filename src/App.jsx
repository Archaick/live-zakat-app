import React from 'react';
import GoldAndCurrency from './Components/GoldAndCurrency';
import TopNav from './Components/TopNav';
import CarouselComponent from './Components/CarouselComponent';
import FAQComponent from './Components/FAQComponent';
import References from './Components/References';
import Footer from './Components/Footer';

function App() {
  
  return (
    <div>
      <TopNav />
      <CarouselComponent />
      <FAQComponent />
      <GoldAndCurrency />
      <References />
      <Footer />
    </div>
  )
}

export default App;

import React from "react";
import "@mantine/core/styles.css";
import GoldAndCurrency from "./Components/GoldAndCurrency";
import TopNav from "./Components/TopNav";
import CarouselComponent from "./Components/CarouselComponent";
import FAQComponent from "./Components/FAQComponent";
import References from "./Components/References";
import Footer from "./Components/Footer";
import { MantineProvider } from "@mantine/core";
import './App.css'

function App() {
  return (
    <MantineProvider>
      <TopNav />
      <CarouselComponent />
      <FAQComponent />
      <GoldAndCurrency />
      <References />
      <Footer />
    </MantineProvider>
  );
}

export default App;

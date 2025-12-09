import "./converter.css";
import { useCurrency } from "./contexts/currency";
import Header from "./ui/Header";
import ResultBox from "./ui/ResultBox";
import ComputationBox from "./ui/ComputationBox";
import { Toaster } from "react-hot-toast";

export default function CurrencyConverter() {
  return (
    <div className="app">
      <Header />
      <div className="converter-box">
        <ComputationBox />
        <ResultBox />
      </div>
      <Toaster
        position="top-left"
        gutter={16}
        containerStyle={{ margin: "10px" }}
        toastOptions={{
          success: { duration: 4000 },
          error: { duration: 5000 },
          style: {
            fontSize: "18px",
            maxWidth: "500px",
            padding: "15px 24px",
            backgroundColor: "var(--color-grey-0)",
            Color: "var(--color-grey-700)",
          },
        }}
      />
      <footer className="footer">
        <p className="powered">Powered by CurrencyBeacon</p>
      </footer>
    </div>
  );
}

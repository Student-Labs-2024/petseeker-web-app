import React from "react";
import AppRouter from "./router/Router";
import "./lib/i18n"; // Impo
import "./ui/main.scss";
import "./ui/reset.scss";
import "./ui/variables.scss";
const App: React.FC = () => {
  return <AppRouter />;
};

export default App;

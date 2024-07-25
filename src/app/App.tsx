import React from "react";
import AppRouter from "./router/Router";


import "./lib/i18n";
import "./ui/variables.scss";
import "./ui/main.scss";
import { useTheme } from "../shared/hooks/useTheme";
const App: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return <AppRouter />;
};

export default App;

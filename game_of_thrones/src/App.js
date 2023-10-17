import Navigation from "../src/components/NavigationBar/Navigation.js";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "../src/routes/AppRoute.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <AppRoute />
      </BrowserRouter>
    </>
  );
}

export default App;

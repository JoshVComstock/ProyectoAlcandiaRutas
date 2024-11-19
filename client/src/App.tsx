import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./hook/useUser";
import RoutesComponent from "./RoutesComponent";

function App() {
  return (
    <UserProvider>
      <Toaster />
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

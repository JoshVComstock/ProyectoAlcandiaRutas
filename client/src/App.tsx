import { HashRouter } from "react-router-dom";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/Routes";
const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <RoutesConfig />
      </QueryClientProvider>
    </Router>
  );
};

export default App;

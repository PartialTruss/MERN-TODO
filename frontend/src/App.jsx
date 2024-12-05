import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/Routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <Router>
        <QueryClientProvider client={queryClient}>
          <RoutesConfig />
        </QueryClientProvider>
      </Router>
    </div>
  );
};

export default App;

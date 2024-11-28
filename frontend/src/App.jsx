import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/Routes";

const App = () => {
  return (
    <div>
      <Router>
        <RoutesConfig />
      </Router>
    </div>
  );
};

export default App;

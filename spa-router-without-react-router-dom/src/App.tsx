import "./App.css";
import { Main, About } from "@/components";
import { Route, Router } from "@/router";

const App = () => {
  return (
    <Router>
      <Route path="/" component={<Main />} />
      <Route path="/about" component={<About />} />
    </Router>
  );
};

export default App;

import { Route, Switch } from "wouter";
import Home from "@/pages/home";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useIdeas";
import NotFound from "@/pages/not-found";

function App() {
  // Initialize localStorage with the useLocalStorage custom hook
  useLocalStorage();
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-500 font-sans">
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

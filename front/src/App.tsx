import './App.css';
import { AuthProvider } from "./contexts/auth";

import Rotas from "./routes";

function App() {
  return (
    <>
        <AuthProvider>
            <Rotas/>
        </AuthProvider>
    </>
  );
}

export default App;

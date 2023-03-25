import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HistoricTable from './Views/HistoricTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HistoricTable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
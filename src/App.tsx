// App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Step1Form from './pages/Step1From';
import Step2Form from './pages/Step2Form';
import DataTables from './components/DataTable';


const App: React.FC = () => {
  return (
  <BrowserRouter>
        <Routes>
      
          <Route path="/" element={<Step1Form />} />
          <Route path="/step2" element={<Step2Form />} />
       
        
      </Routes>
      <DataTables />
      </BrowserRouter>
    
  );
}

export default App;

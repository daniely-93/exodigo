import { Route, Routes } from 'react-router';
import DrinksList from './pages/DrinksList';
import DrinkDtails from './pages/DrinkDetails';
import AddDrink from './pages/AddDrink';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DrinksList />} />
            <Route path="/drink/:id" element={<DrinkDtails />} />
            <Route path="/add" element={<AddDrink />} />
        </Routes>
    );
}

export default App;

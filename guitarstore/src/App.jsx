import {useState} from 'react';
import './App.css';
import GuitarForm from './components/GuitarForm';
import GuitarInventory from './components/GuitarInventory';
import GuitarDetails from './components/GuitarDetails';

function App() {
    const [guitars, setGuitars] = useState([]);
    const [selectedGuitar, setSelectedGuitar] = useState(null);

    const handleAddGuitar = (guitar) => {
        setGuitars([...guitars, guitar]);
    };

    const handleSelectGuitar = (guitar) => {
        setSelectedGuitar(guitar);
    };

    return (
        <div className="App">
            <h1>Guitar Store</h1>

            <GuitarForm onAddGuitar={handleAddGuitar} />

            <GuitarInventory
                guitars={guitars}
                onSelectGuitar={handleSelectGuitar}
            />

            <GuitarDetails guitar={selectedGuitar} />
        </div>
    );
}

export default App;
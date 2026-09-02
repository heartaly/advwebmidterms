import {useState} from 'react';
import './App.css';
import GuitarForm from './components/GuitarForm';

function App() {
    const [guitars, setGuitars] = useState([]);

    const handleAddGuitar = (guitar) => {
        setGuitars([...guitars, guitar]);
    };

    return (
        <div className="App">
            <h1>Guitar Store</h1>

            <GuitarForm onAddGuitar={handleAddGuitar} />
        </div>
    );
}

export default App;
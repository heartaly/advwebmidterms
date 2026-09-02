import { useState } from 'react';
import './App.css';
import GuitarForm from './components/GuitarForm';
import GuitarInventory from './components/GuitarInventory';
import GuitarDetails from './components/GuitarDetails';
import bgp from './assets/bgp.png';
import light from './assets/guitars/light.png';
import electric from './assets/guitars/electric.png';
import acoustic from './assets/guitars/acoustic.png';
import bass from './assets/guitars/bass.png';
import classical from './assets/guitars/classical.png';

const guitarMap = {
    Electric: electric,
    Acoustic: acoustic,
    Bass: bass,
    Classical: classical,
};

function App() {
    const [guitars, setGuitars] = useState([]);
    const [selectedBodyType, setSelectedBodyType] = useState('Electric');
    const [selectedGuitar, setSelectedGuitar] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleAddGuitar = (guitar) => {
        const newGuitar = {
            ...guitar,
            id: Date.now() + Math.random(),
        };

        setGuitars((prev) => [...prev, newGuitar]);
    setSelectedGuitar(newGuitar);
    setShowForm(false);
    };

    return (
        <div className="guitarStore" style={{ backgroundImage: `url(${bgp})` }}>
            <div className="contentWrap">
                <header className="brandHeader">
                    <h1>Gitarama</h1>
                    <p>For all your guitar needs.</p>
                </header>

                <div className="studioStage">
                    <div className="guitarStage" aria-label="Guitar showcase">
                        {Object.entries(guitarMap).map(([type, image]) => (
                            <img
                                key={type}
                                src={image}
                                alt={type}
                                className={`guitar ${selectedBodyType === type ? 'active' : ''}`}
                            />
                        ))}
                        <img src={light} alt="Studio light" className="lightBeam" />
                    </div>

                    <div className="formPanel">
                        {showForm ? (
                            <GuitarForm
                                onAddGuitar={handleAddGuitar}
                                selectedBodyType={selectedBodyType}
                                onBodyTypeChange={setSelectedBodyType}
                            />
                        ) : (
                            <button
                                type="button"
                                className="formToggleButton"
                                onClick={() => setShowForm(true)}
                            >
                                Add Guitar
                            </button>
                        )}
                    </div>
                </div>

                <div className="inventoryLayout">
                    <div className="inventorySection">
                        <GuitarInventory
                            guitars={guitars}
                            onSelectGuitar={setSelectedGuitar}
                            selectedGuitar={selectedGuitar}
                        />
                    </div>

                    <div className="detailsSection">
                        <GuitarDetails guitar={selectedGuitar} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
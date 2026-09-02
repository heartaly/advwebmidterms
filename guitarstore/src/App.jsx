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

const starterGuitars = [
    {
        id: 'starter-electric',
        guitarModel: 'Player Stratocaster',
        bodyType: 'Electric',
        brandName: 'Fender',
        stockQuantity: 8,
        manufacturerName: 'Fender Musical Instruments',
        userRole: 'Merchant',
    },
    {
        id: 'starter-acoustic',
        guitarModel: 'FG800',
        bodyType: 'Acoustic',
        brandName: 'Yamaha',
        stockQuantity: 12,
        manufacturerName: 'Yamaha Corporation',
        userRole: 'Merchant',
    },
    {
        id: 'starter-bass',
        guitarModel: 'Affinity P Bass',
        bodyType: 'Bass',
        brandName: 'Squier',
        stockQuantity: 5,
        manufacturerName: 'Fender Musical Instruments',
        userRole: 'Consumer',
    },
    {
        id: 'starter-classical',
        guitarModel: 'C40 Classical',
        bodyType: 'Classical',
        brandName: 'Yamaha',
        stockQuantity: 6,
        manufacturerName: 'Yamaha Corporation',
        userRole: 'Consumer',
    },
    {
        id: 'starter-electric-2',
        guitarModel: 'Les Paul Studio',
        bodyType: 'Electric',
        brandName: 'Gibson',
        stockQuantity: 3,
        manufacturerName: 'Gibson Brands',
        userRole: 'Merchant',
    },
];

function App() {
    const [guitars, setGuitars] = useState(starterGuitars);
    const [selectedBodyType, setSelectedBodyType] = useState('Electric');
    const [selectedGuitar, setSelectedGuitar] = useState(null);

    const handleAddGuitar = (guitar) => {
        const newGuitar = {
            ...guitar,
            id: Date.now() + Math.random(),
        };

        setGuitars((prev) => [...prev, newGuitar]);
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
                        <GuitarForm
                            onAddGuitar={handleAddGuitar}
                            selectedBodyType={selectedBodyType}
                            onBodyTypeChange={setSelectedBodyType}
                        />
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
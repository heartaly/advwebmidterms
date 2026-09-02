import {useEffect, useState} from 'react';

function GuitarDetails({guitar}) {
    const [activeGuitar, setActiveGuitar] = useState(null);
    const [showMerchant, setShowMerchant] = useState(true);

    useEffect(() => {
        setActiveGuitar(guitar);
    }, [guitar]);

    if (activeGuitar === null) {
        return <p>Select a guitar from the table.</p>;
    }

    if (!showMerchant && activeGuitar.userRole === 'Merchant') {
        return <p>Merchant records are hidden.</p>;
    }

    return (
        <div>
            <h2>Guitar Details</h2>

            <p>Guitar Model: {activeGuitar.guitarModel}</p>
            <p>Body Type: {activeGuitar.bodyType}</p>
            <p>Brand Name: {activeGuitar.brandName}</p>
            <p>Stock Quantity: {activeGuitar.stockQuantity}</p>
            <p>Manufacturer Name: {activeGuitar.manufacturerName}</p>

            <p>
                User Role:
                <span>{activeGuitar.userRole}</span>
            </p>

            <button onClick={() => setShowMerchant(!showMerchant)}>
                {showMerchant ? 'Hide Merchants' : 'Show Merchants'}
            </button>
        </div>
    );
}

export default GuitarDetails;
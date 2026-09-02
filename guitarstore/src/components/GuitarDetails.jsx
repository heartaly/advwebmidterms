import { useEffect, useState } from 'react';

function GuitarDetails({ guitar }) {
    const [activeGuitar, setActiveGuitar] = useState(null);

    useEffect(() => {
        setActiveGuitar(guitar);
    }, [guitar]);

    if (activeGuitar === null) {
        return (
            <div className="detailsCard emptyState">
                <h2>Guitar Details</h2>
                <p>Select a guitar from the table.</p>
            </div>
        );
    }

    return (
        <div className="detailsCard">
            <h2>Guitar Details</h2>

            <div className="detailsGrid">
                <span>Guitar Model</span>
                <strong>{activeGuitar.guitarModel}</strong>

                <span>Body Type</span>
                <strong>{activeGuitar.bodyType}</strong>

                <span>Brand Name</span>
                <strong>{activeGuitar.brandName}</strong>

                <span>Stock Quantity</span>
                <strong>{activeGuitar.stockQuantity}</strong>

                <span>Manufacturer Name</span>
                <strong>{activeGuitar.manufacturerName}</strong>

                <span>User Role</span>
                <strong>{activeGuitar.userRole}</strong>
            </div>

        </div>
    );
}

export default GuitarDetails;
import { useEffect, useRef } from 'react';

function GuitarDetails({ guitar }) {
    const detailsRef = useRef(null);
    useEffect(() => {
        if (guitar) {
            detailsRef.current?.focus();
        }
    }, [guitar]);

    if (guitar === null) {
        return (
            <div className="detailsCard emptyState">
                <h2>Guitar Details</h2>
                <p>Select a guitar from the table.</p>
            </div>
        );
    }

    return (
        <div className="detailsCard" ref={detailsRef} tabIndex={-1}>
            <h2>Guitar Details</h2>

            <div className="detailsGrid">
                <span>Guitar Model</span>
                <strong>{guitar.guitarModel}</strong>

                <span>Body Type</span>
                <strong>{guitar.bodyType}</strong>

                <span>Brand Name</span>
                <strong>{guitar.brandName}</strong>

                <span>Stock Quantity</span>
                <strong>{guitar.stockQuantity}</strong>

                <span>Manufacturer Name</span>
                <strong>{guitar.manufacturerName}</strong>

                <span>User Role</span>
                <strong className="roleBadge">{guitar.userRole}</strong>
            </div>

        </div>
    );
}

export default GuitarDetails;
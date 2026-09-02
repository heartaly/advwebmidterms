import { useEffect, useState } from 'react';

function GuitarForm({ onAddGuitar, selectedBodyType, onBodyTypeChange }) {
    const [guitarModel, setGuitarModel] = useState('');
    const [bodyType, setBodyType] = useState(selectedBodyType || 'Electric');
    const [brandName, setBrandName] = useState('');
    const [stockQuantity, setStockQuantity] = useState(1);
    const [manufacturerName, setManufacturerName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedBodyType) {
            setBodyType(selectedBodyType);
        }
    }, [selectedBodyType]);

    const validateForm = () => {
        const newErrors = {};

        if (guitarModel.trim().length < 3 || guitarModel === '') {
            newErrors.guitarModel = 'Guitar model must be at least 3 characters long.';
        }

        if (bodyType === '') {
            newErrors.bodyType = 'Body type is required.';
        }

        if (brandName === '' || brandName.trim().length < 3) {
            newErrors.brandName = 'Brand name must be at least 3 characters long.';
        }

        if (stockQuantity === '' || stockQuantity < 1 || stockQuantity > 100) {
            newErrors.stockQuantity = 'Stock quantity must be between 1 and 100.';
        }

        if (manufacturerName === '' || manufacturerName.trim().length < 3) {
            newErrors.manufacturerName = 'Manufacturer name must be at least 3 characters long.';
        }

        if (userRole === '') {
            newErrors.userRole = 'User role is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBodyTypeChange = (event) => {
        const nextType = event.target.value;
        setBodyType(nextType);
        if (onBodyTypeChange) {
            onBodyTypeChange(nextType);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const newGuitar = {
                guitarModel,
                bodyType,
                brandName,
                stockQuantity,
                manufacturerName,
                userRole,
            };

            if (onAddGuitar) {
                onAddGuitar(newGuitar);
            }
        }
    };

    return (
        <form className="guitarForm" onSubmit={handleSubmit}>
            <h2>Add Guitar</h2>

            <div className="formGrid">
                <div className="fieldGroup">
                    <label>Guitar Model</label>
                    <input
                        type="text"
                        value={guitarModel}
                        onChange={(e) => setGuitarModel(e.target.value)}
                    />
                    {errors.guitarModel && <p className="errorText">{errors.guitarModel}</p>}
                </div>

                <div className="fieldGroup">
                    <label>Body Type</label>
                    <select value={bodyType} onChange={handleBodyTypeChange}>
                        <option value="Electric">Electric</option>
                        <option value="Acoustic">Acoustic</option>
                        <option value="Bass">Bass</option>
                        <option value="Classical">Classical</option>
                    </select>
                    {errors.bodyType && <p className="errorText">{errors.bodyType}</p>}
                </div>

                <div className="fieldGroup">
                    <label>Brand Name</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                    />
                    {errors.brandName && <p className="errorText">{errors.brandName}</p>}
                </div>

                <div className="fieldGroup">
                    <label>Stock Quantity</label>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(Number(e.target.value))}
                    />
                    {errors.stockQuantity && <p className="errorText">{errors.stockQuantity}</p>}
                </div>

                <div className="fieldGroup fullWidth">
                    <label>Manufacturer Name</label>
                    <input
                        type="text"
                        value={manufacturerName}
                        onChange={(e) => setManufacturerName(e.target.value)}
                    />
                    {errors.manufacturerName && (
                        <p className="errorText">{errors.manufacturerName}</p>
                    )}
                </div>

                <div className="fieldGroup fullWidth radioGroup">
                    <label>User Role</label>
                    <div className="radioRow">
                        <label>
                            <input
                                type="radio"
                                name="userRole"
                                value="Merchant"
                                checked={userRole === 'Merchant'}
                                onChange={(e) => setUserRole(e.target.value)}
                            />
                            Merchant
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="userRole"
                                value="Consumer"
                                checked={userRole === 'Consumer'}
                                onChange={(e) => setUserRole(e.target.value)}
                            />
                            Consumer
                        </label>
                    </div>
                    {errors.userRole && <p className="errorText">{errors.userRole}</p>}
                </div>
            </div>

            <button type="submit" className="submitButton">
                Add Guitar
            </button>
        </form>
    );
}

export default GuitarForm;
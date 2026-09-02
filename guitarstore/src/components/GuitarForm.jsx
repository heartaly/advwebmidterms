import { useState } from 'react';

function GuitarForm({ onAddGuitar, selectedBodyType, onBodyTypeChange }) {
    const [guitarModel, setGuitarModel] = useState('');
    const [bodyType, setBodyType] = useState(selectedBodyType || 'Electric');
    const [brandName, setBrandName] = useState('');
    const [stockQuantity, setStockQuantity] = useState(1);
    const [manufacturerName, setManufacturerName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [errors, setErrors] = useState({});

    const getValidationErrors = (values) => {
        const newErrors = {};

        if (values.guitarModel.trim().length < 3) {
            newErrors.guitarModel = 'Guitar model must be at least 3 characters long.';
        }

        if (values.bodyType === '') {
            newErrors.bodyType = 'Body type is required.';
        }

        if (values.brandName.trim().length < 3) {
            newErrors.brandName = 'Brand name must be at least 3 characters long.';
        }

        if (values.stockQuantity === '' || values.stockQuantity < 1 || values.stockQuantity > 100) {
            newErrors.stockQuantity = 'Stock quantity must be between 1 and 100.';
        }

        if (values.manufacturerName.trim().length < 3) {
            newErrors.manufacturerName = 'Manufacturer name must be at least 3 characters long.';
        }

        if (values.userRole === '') {
            newErrors.userRole = 'User role is required.';
        }

        return newErrors;
    };

    const getCurrentValues = () => ({
        guitarModel,
        bodyType,
        brandName,
        stockQuantity,
        manufacturerName,
        userRole,
    });

    const updateErrors = (field, value) => {
        setErrors(getValidationErrors({ ...getCurrentValues(), [field]: value }));
    };

    const handleBodyTypeChange = (event) => {
        const nextType = event.target.value;
        setBodyType(nextType);
        updateErrors('bodyType', nextType);
        if (onBodyTypeChange) {
            onBodyTypeChange(nextType);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = getValidationErrors(getCurrentValues());
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
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
                        onChange={(e) => {
                            setGuitarModel(e.target.value);
                            updateErrors('guitarModel', e.target.value);
                        }}
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
                        onChange={(e) => {
                            setBrandName(e.target.value);
                            updateErrors('brandName', e.target.value);
                        }}
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
                        onChange={(e) => {
                            const nextQuantity = e.target.value === '' ? '' : Number(e.target.value);
                            setStockQuantity(nextQuantity);
                            updateErrors('stockQuantity', nextQuantity);
                        }}
                    />
                    {errors.stockQuantity && <p className="errorText">{errors.stockQuantity}</p>}
                </div>

                <div className="fieldGroup fullWidth">
                    <label>Manufacturer Name</label>
                    <input
                        type="text"
                        value={manufacturerName}
                        onChange={(e) => {
                            setManufacturerName(e.target.value);
                            updateErrors('manufacturerName', e.target.value);
                        }}
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
                                onChange={(e) => {
                                    setUserRole(e.target.value);
                                    updateErrors('userRole', e.target.value);
                                }}
                            />
                            Merchant
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="userRole"
                                value="Consumer"
                                checked={userRole === 'Consumer'}
                                onChange={(e) => {
                                    setUserRole(e.target.value);
                                    updateErrors('userRole', e.target.value);
                                }}
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
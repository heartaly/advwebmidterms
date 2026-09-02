import { useEffect, useState } from 'react';

function GuitarForm({ onAddGuitar, selectedBodyType, onBodyTypeChange }) {
    const [guitarModel, setGuitarModel] = useState('');
    const [bodyType, setBodyType] = useState(selectedBodyType || 'Electric');
    const [brandName, setBrandName] = useState('');
    const [stockQuantity, setStockQuantity] = useState(1);
    const [manufacturerName, setManufacturerName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showSavedPrompt, setShowSavedPrompt] = useState(false);

    useEffect(() => {
        if (selectedBodyType) {
            setBodyType(selectedBodyType);
        }
    }, [selectedBodyType]);

    const validateField = (field, value) => {
        if (field === 'guitarModel' && (!value || value.trim().length < 3)) {
            return 'Guitar model must be at least 3 characters long.';
        }
        if (field === 'bodyType' && value === '') {
            return 'Body type is required.';
        }
        if (field === 'brandName' && (!value || value.trim().length < 3)) {
            return 'Brand name must be at least 3 characters long.';
        }
        if (field === 'stockQuantity' && (value === '' || value < 1 || value > 100)) {
            return 'Stock quantity must be between 1 and 100.';
        }
        if (field === 'manufacturerName' && (!value || value.trim().length < 3)) {
            return 'Manufacturer name must be at least 3 characters long.';
        }
        if (field === 'userRole' && value === '') {
            return 'User role is required.';
        }
        return '';
    };

    const updateField = (field, value, setter) => {
        setter(value);
        if (touched[field]) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [field]: validateField(field, value),
            }));
        }
    };

    const handleBlur = (field, value) => {
        setTouched((currentTouched) => ({ ...currentTouched, [field]: true }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            [field]: validateField(field, value),
        }));
    };

    const validateForm = () => {
        const values = { guitarModel, bodyType, brandName, stockQuantity, manufacturerName, userRole };
        const newErrors = Object.fromEntries(
            Object.entries(values)
                .map(([field, value]) => [field, validateField(field, value)])
                .filter(([, error]) => error),
        );
        setTouched(Object.fromEntries(Object.keys(values).map((field) => [field, true])));
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBodyTypeChange = (event) => {
        const nextType = event.target.value;
        updateField('bodyType', nextType, setBodyType);
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

            setShowSavedPrompt(true);
        }
    };

    return (
        <>
            <form className="guitarForm" onSubmit={handleSubmit}>
            <h2>Add Guitar</h2>

            <div className="formGrid">
                <div className="fieldGroup">
                    <label>Guitar Model</label>
                    <input
                        type="text"
                        value={guitarModel}
                        onChange={(e) => updateField('guitarModel', e.target.value, setGuitarModel)}
                        onBlur={() => handleBlur('guitarModel', guitarModel)}
                    />
                    {errors.guitarModel && <p className="errorText">{errors.guitarModel}</p>}
                </div>

                <div className="fieldGroup">
                    <label>Body Type</label>
                    <select
                        value={bodyType}
                        onChange={handleBodyTypeChange}
                        onBlur={() => handleBlur('bodyType', bodyType)}
                    >
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
                        onChange={(e) => updateField('brandName', e.target.value, setBrandName)}
                        onBlur={() => handleBlur('brandName', brandName)}
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
                            const value = e.target.value === '' ? '' : Number(e.target.value);
                            updateField('stockQuantity', value, setStockQuantity);
                        }}
                        onBlur={() => handleBlur('stockQuantity', stockQuantity)}
                    />
                    {errors.stockQuantity && <p className="errorText">{errors.stockQuantity}</p>}
                </div>

                <div className="fieldGroup fullWidth">
                    <label>Manufacturer Name</label>
                    <input
                        type="text"
                        value={manufacturerName}
                        onChange={(e) => updateField('manufacturerName', e.target.value, setManufacturerName)}
                        onBlur={() => handleBlur('manufacturerName', manufacturerName)}
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
                                onChange={(e) => updateField('userRole', e.target.value, setUserRole)}
                                onBlur={() => handleBlur('userRole', userRole)}
                            />
                            Merchant
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="userRole"
                                value="Consumer"
                                checked={userRole === 'Consumer'}
                                onChange={(e) => updateField('userRole', e.target.value, setUserRole)}
                                onBlur={() => handleBlur('userRole', userRole)}
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

            {showSavedPrompt && (
                <div className="savePromptBackdrop" role="presentation">
                    <div
                        className="savePrompt"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="savePromptTitle"
                    >
                        <span className="savePromptIcon" aria-hidden="true">OK</span>
                        <h3 id="savePromptTitle">Guitar saved</h3>
                        <p>Your guitar has been added to the inventory.</p>
                        <button
                            type="button"
                            className="savePromptButton"
                            onClick={() => setShowSavedPrompt(false)}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default GuitarForm;
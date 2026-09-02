import {useState} from 'react';

function GuitarForm({onAddGuitar}) {
    const [guitarModel, setGuitarModel] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [brandName, setBrandName] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const [manufacturerName, setManufacturerName] = useState('');
    const [userRole, setUserRole] = useState(''); 

    const [errors, setErrors] = useState({});

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

        if (
            stockQuantity === "" ||
            stockQuantity < 1 ||
            stockQuantity > 100
        ) {
            newErrors.stockQuantity = 'Stock quantity must be between 1 and 100.';
        }
        
        if (
            manufacturerName === '' ||
            manufacturerName.trim().length < 3
        ) {
            newErrors.manufacturerName = 'Manufacturer name must be at least 3 characters long.';
        }

        if (userRole === "") {
            newErrors.userRole = 'User role is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const newGuitar = {
                guitarModel,
                bodyType,
                brandName,
                stockQuantity,
                manufacturerName,
                userRole
            };
            onAddGuitar(newGuitar);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2> Add Guitar </h2>

            <div>
                <label>Guitar Model:</label>
                <input
                    type="text"
                    value={guitarModel}
                    onChange={(e) => setGuitarModel(e.target.value)}
                />
                {errors.guitarModel && ( <p> {errors.guitarModel}</p>
                )}
            </div>

            <div>
                <label>Body Type:</label>
                <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                >
                    <option value="">Select Body Type</option>
                    <option value="Electric">Electric</option>
                    <option value="Acoustic">Acoustic</option>
                    <option value="Bass">Bass</option>
                    <option value="Classical">Classical</option>
                </select>

                {errors.bodyType && ( <p> {errors.bodyType}</p>
                )}
            </div>

            <div>
                <label>Brand Name:</label>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                />
                {errors.brandName && ( <p> {errors.brandName}</p>
                )}
            </div>

            <div>
                <label>Stock Quantity:</label>
                <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) =>
                        setStockQuantity(e.target.value)
                    }
                />
                {errors.stockQuantity && (
                    <p> {errors.stockQuantity}</p>
                )}
            </div>

            <div>
                <label>Manufacturer Name:</label>
                <input
                    type="text"
                    value={manufacturerName}
                    onChange={(e) =>
                        setManufacturerName(e.target.value)
                    }
                />
                {errors.manufacturerName && (
                    <p> {errors.manufacturerName}</p>
                )}
            </div>

            <div>
                <label>User Role:</label>

                <label>
                    <input
                        type="radio"
                        name="userRole"
                        value="Merchant"
                        checked={userRole === 'Merchant'}
                        onChange={(e) => setUserRole(e.target.value)}
                    /> Merchant
                    </label>

                <label>
                    <input
                        type="radio"
                        name="userRole"
                        value="Consumer"
                        checked={userRole === 'Consumer'}
                        onChange={(e) => setUserRole(e.target.value)}
                    /> Consumer
                </label>

                {errors.userRole && (
                    <p> {errors.userRole}</p>
                )}
            </div>

            <button type="submit">Add Guitar</button>
        </form>
    );
}

export default GuitarForm;
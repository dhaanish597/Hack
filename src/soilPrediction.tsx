import { useState } from "react";
import "./App.css"
const CropFertilizerRecommendation: React.FC = () => {
    const [formData, setFormData] = useState({
        N: "",
        P: "",
        K: "",
        Zn: "",
        SOC: "",
        B: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: ""
    });
    const [result, setResult] = useState<{ crop_prediction?: string; fertilizer_prediction?: string }>({});
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setResult({});
        setLoading(true);

        try {
            // Validate all inputs are numbers
            const numericData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
            );

            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(numericData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                setError(`Error: ${data.error}`);
            } else {
                setResult(data);
                // Save data to local storage
                const predictionData = {
                    ...numericData,
                    crop: data.crop_prediction,
                    fertilizer: data.fertilizer_prediction
                };
                localStorage.setItem("soilPrediction", JSON.stringify(predictionData));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error: Unable to fetch data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Prediction-container">
            <h2 className="Prediction-heading">Crop & Fertilizer Recommendation</h2>
            <form id="predictionForm" onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="Prediction-label" htmlFor={key}>
                            {key.replace(/_/g, ' ').toUpperCase()}:
                        </label>
                        <input 
                            className="Prediction-input"
                            type="number"
                            step="any"
                            id={key}
                            name={key}
                            value={formData[key as keyof typeof formData]}
                            onChange={handleChange}
                            required
                            placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                        />
                    </div>
                ))}
                <button 
                    className="Prediction-button" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Predicting..." : "Predict"}
                </button>
            </form>
            <div className="Prediction-result" id="result">
                {result.crop_prediction && result.fertilizer_prediction && (
                    <div className="result-card">
                        <h3>Prediction Results</h3>
                        <p><strong>Recommended Crop:</strong> {result.crop_prediction}</p>
                        <p><strong>Recommended Fertilizer:</strong> {result.fertilizer_prediction}</p>
                    </div>
                )}
            </div>
            {error && <p className="Prediction-error" id="error">{error}</p>}
        </div>
    );
};

export default CropFertilizerRecommendation;

// Remove the unused PredictionData interface
// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface PredictionData {
//   N: number;
//   P: number;
//   K: number;
//   temperature: number;
//   humidity: number;
//   ph: number;
//   rainfall: number;
//   prediction?: string;
// }

// const SoilNutrientPrediction: React.FC = () => {
//   const [formData, setFormData] = useState({
//     nitrogen: '',
//     phosphorus: '',
//     potassium: '',
//     temperature: '',
//     humidity: '',
//     ph: '',
//     rainfall: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [predictionResult, setPredictionResult] = useState<string | null>(null);

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Convert form data to chart data
//   const chartData = [
//     { name: 'Nitrogen', value: Number(formData.nitrogen) || 0 },
//     { name: 'Phosphorus', value: Number(formData.phosphorus) || 0 },
//     { name: 'Potassium', value: Number(formData.potassium) || 0 },
//     { name: 'Temperature', value: Number(formData.temperature) || 0 },
//     { name: 'Humidity', value: Number(formData.humidity) || 0 },
//     { name: 'pH', value: Number(formData.ph) || 0 },
//     { name: 'Rainfall', value: Number(formData.rainfall) || 0 },
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Mock prediction
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setPredictionResult('Sample Crop');
//     } catch (error) {
//       console.error('Prediction failed:', error);
//       alert('Prediction failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Soil Nutrient Prediction</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Form Section */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {Object.entries(formData).map(([key, value]) => (
//               <div key={key}>
//                 <label className="block text-sm font-medium mb-1">
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </label>
//                 <input
//                   type="number"
//                   name={key}
//                   value={value}
//                   onChange={handleFormChange}
//                   className="w-full p-2 border rounded"
//                   required
//                   step="0.01"
//                 />
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Processing...' : 'Predict'}
//             </button>
//           </form>
//         </div>

//         {/* Graph Section */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Nutrient Analysis</h2>
//           <div className="h-[400px]"> {/* Fixed height container */}
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="name" 
//                   angle={-45} 
//                   textAnchor="end" 
//                   height={60}
//                 />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar 
//                   dataKey="value" 
//                   fill="#8884d8"
//                   name="Value"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Prediction Result */}
//       {predictionResult && (
//         <div className="mt-6 p-4 bg-white rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
//           <p className="text-lg">
//             Recommended Crop: <span className="font-bold text-green-600">{predictionResult}</span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SoilNutrientPrediction;

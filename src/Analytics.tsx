import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionData {
  N: number;
  P: number;
  K: number;
  Zn: number;
  SOC: number;
  B: number;
  Temperature: number;
  Humidity: number;
  pH: number;
  Rainfall: number;
  crop: string;
  fertilizer: string;
}

const Analytics = () => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("soilPrediction");
    if (savedData) {
      setPredictionData(JSON.parse(savedData));
    }
  }, []);

  const data = {
    labels: ['N', 'P', 'K', 'Zn', 'SOC', 'B'],
    datasets: [
      {
        label: 'Nutrient Levels',
        data: predictionData ? [predictionData.N, predictionData.P, predictionData.K, predictionData.Zn, predictionData.SOC, predictionData.B] : [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // N
          'rgba(255, 206, 86, 0.2)', // P
          'rgba(75, 192, 192, 0.2)', // K
          'rgba(153, 102, 255, 0.2)', // Zn
          'rgba(255, 159, 64, 0.2)', // SOC
          'rgba(54, 162, 235, 0.2)', // B
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const determineStatus = (value: number, ranges: { deficient: number; adequate: number; surplus: number }) => {
    if (value < ranges.deficient) return 'Deficiency';
    if (value <= ranges.adequate) return 'Adequate';
    return 'Surplus';
  };

  const nutrientStatus = [
    { name: 'N', value: predictionData?.N || 0, status: determineStatus(predictionData?.N || 0, { deficient: 280, adequate: 560, surplus: Infinity }) },
    { name: 'P', value: predictionData?.P || 0, status: determineStatus(predictionData?.P || 0, { deficient: 10, adequate: 25, surplus: Infinity }) },
    { name: 'K', value: predictionData?.K || 0, status: determineStatus(predictionData?.K || 0, { deficient: 110, adequate: 280, surplus: Infinity }) },
    { name: 'Zn', value: predictionData?.Zn || 0, status: determineStatus(predictionData?.Zn || 0, { deficient: 0.6, adequate: 1.2, surplus: Infinity }) },
    { name: 'B', value: predictionData?.B || 0, status: determineStatus(predictionData?.B || 0, { deficient: 0.5, adequate: 1.0, surplus: Infinity }) },
    { name: 'SOC', value: predictionData?.SOC || 0, status: determineStatus(predictionData?.SOC || 0, { deficient: 0.5, adequate: 0.75, surplus: Infinity }) },
  ];

  const cropTemperatureRanges = {
    Wheat: { min: 20, max: 25 },
    Rice: { min: 25, max: 35 },
  };

  const cropHumidityRanges = {
    Maize: { min: 50, max: 70 },
    Rice: { min: 70, max: 90 },
  };

  const cropRainfallRanges = {
    Cotton: { min: 500, max: 900 },
    Rice: { min: 1200, max: Infinity },
    Pulses: { min: 300, max: 600 },
  };

  const PHGauge = ({ pH }: { pH: number }) => {
    const radius = 100;
    const circumference = Math.PI * radius;
    const pHPosition = ((pH - 4) / 5) * circumference; // Map pH 4-9 to circumference

    return (
      <svg width="100%" height="200" viewBox="0 0 200 100">
        <path d="M10,90 A80,80 0 0,1 190,90" fill="none" stroke="#FF0000" strokeWidth="20" />
        <path d="M40,90 A50,50 0 0,1 160,90" fill="none" stroke="#FFFF00" strokeWidth="20" />
        <path d="M70,90 A20,20 0 0,1 130,90" fill="none" stroke="#00FF00" strokeWidth="20" />
        <line x1="100" y1="90" x2={100 + 80 * Math.cos(Math.PI * (pH - 4) / 5)} y2={90 - 80 * Math.sin(Math.PI * (pH - 4) / 5)} stroke="black" strokeWidth="3" />
        <text x="100" y="95" textAnchor="middle" fontSize="14">pH {pH.toFixed(1)}</text>
        <text x="20" y="110" fontSize="10">4.0</text>
        <text x="180" y="110" fontSize="10">9.0</text>
        <text x="50" y="70" fontSize="10">Acidic</text>
        <text x="150" y="70" fontSize="10">Alkaline</text>
        <text x="100" y="50" textAnchor="middle" fontSize="10">Neutral (Ideal)</text>
      </svg>
    );
  };

  return (
    <div className="analytics-container">
      <h2>Input Parameter Summary</h2>
      <Bar data={data} options={options} />
      <div className="legend">
        {nutrientStatus.map((nutrient) => (
          <p key={nutrient.name}>
            {nutrient.name}: {nutrient.status === 'Deficiency' ? '🔴' : nutrient.status === 'Adequate' ? '🟡' : '🟢'}
          </p>
        ))}
      </div>
      <div className="legend-explanation">
        <p>🔴 Deficiency (below optimal)</p>
        <p>🟡 Adequate</p>
        <p>🟢 Surplus (but not harmful)</p>
      </div>
      <h2>Environment Overview Dashboard</h2>
      <div className="environment-overview">
        <h3>Temperature 🌡️</h3>
        <Line
          data={{
            labels: Object.keys(cropTemperatureRanges),
            datasets: [
              {
                label: 'User Temperature',
                data: Object.keys(cropTemperatureRanges).map(() => predictionData?.Temperature || 0),
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
              },
              ...Object.entries(cropTemperatureRanges).map(([crop, range]) => ({
                label: `${crop} Ideal Range`,
                data: [range.min, range.max],
                borderColor: 'rgba(75, 192, 192, 0.5)',
                fill: '+1',
              })),
            ],
          }}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
        <h3>Humidity 💧</h3>
        <Line
          data={{
            labels: Object.keys(cropHumidityRanges),
            datasets: [
              {
                label: 'User Humidity',
                data: Object.keys(cropHumidityRanges).map(() => predictionData?.Humidity || 0),
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
              },
              ...Object.entries(cropHumidityRanges).map(([crop, range]) => ({
                label: `${crop} Ideal Range`,
                data: [range.min, range.max],
                borderColor: 'rgba(153, 102, 255, 0.5)',
                fill: '+1',
              })),
            ],
          }}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
        <h3>pH ⚖️</h3>
        <div className="environment-overview" style={{ width: '50%' }}>
          <PHGauge pH={predictionData?.pH ?? 7} />
          <p>{(predictionData?.pH ?? 7) < 5.5 ? '⚠️ Your soil is too acidic – consider adding lime.' : (predictionData?.pH ?? 7) > 8.0 ? '⚠️ Your soil is too alkaline – consider adding sulfur.' : '✅ Your soil pH is ideal for most crops.'}</p>
        </div>
        <h3>Rainfall ️</h3>
        <Bar
          data={{
            labels: Object.keys(cropRainfallRanges),
            datasets: [
              {
                label: 'User Rainfall',
                data: Object.keys(cropRainfallRanges).map(() => predictionData?.Rainfall || 0),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              },
              ...Object.entries(cropRainfallRanges).map(([crop, range]) => ({
                label: `${crop} Ideal Range`,
                data: [range.min, range.max],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              })),
            ],
          }}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>
    </div>
  );
};

export default Analytics;

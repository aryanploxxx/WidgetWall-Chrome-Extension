import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const sampleData = {
  steps: [
    { date: '2024-07-21', count: 10500 },
    { date: '2024-07-22', count: 12345 },
    { date: '2024-07-23', count: 9800 },
    { date: '2024-07-24', count: 11000 },
    { date: '2024-07-25', count: 12500 },
  ],
};

const DailyStepCount = () => {
  const dates = sampleData.steps.map(step => step.date);
  const counts = sampleData.steps.map(step => step.count);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Steps Count',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Step Count',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-[33%] rounded-xl border bg-white flex justify-center items-center shadow-lg'>
      <div className="text-center px-8 ">
        <h1 className="text-3xl font-bold mb-6">Daily Step Count</h1>
        <div className="w-full max-w-lg mx-auto">
          <Bar data={data} options={options} height={280} />
        </div>
      </div>
    </div>
  );
};

export default DailyStepCount;

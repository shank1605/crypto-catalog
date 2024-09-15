import React from 'react'
import { Line } from 'react-chartjs-2'
import { ChartData } from 'chart.js'

interface ChartComponentProps {
  data: ChartData;
  loading: boolean;
  error: string | null;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, loading, error }) => {

  if (loading) {
    return <p className="text-lg text-center">Loading chart data...</p>
  }

  if (error) {
    return <p className="text-lg text-red-500 text-center">{error}</p>
  }

  return (
    <div className="w-full max-w-4xl">
      <Line data={data as any} />
    </div>
  )
}

export default ChartComponent

import axios from 'axios'
import { DataPoint } from '../types'

export const mockData = (): DataPoint[] => {
  const dataPoints: DataPoint[] = []
  const startDate = new Date()
  let price = 63000 

  for (let i = 0; i < 20; i++) {
    const change = Math.random() * 1000 - 500 
    price += change

    dataPoints.push({
      time: new Date(startDate.getTime() - i * 86400000).toLocaleDateString(),
      value: price,
    })
  }
  return dataPoints.reverse() 
}

export const fetchData = async (range: string, useMock: boolean): Promise<DataPoint[]> => {
  if (useMock) {
    return mockData()
  }

  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
    {
      params: {
        vs_currency: 'usd',
        days: range,
      },
    }
  )
  return response.data.prices.map((item: [number, number]) => ({
    time: new Date(item[0]).toLocaleDateString(),
    value: item[1],
  }))
}

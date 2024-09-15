import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Box, Typography, Grid, IconButton, createTheme, ThemeProvider, Skeleton } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import debounce from 'debounce'
import TabNavigation from './components/Tabs'
import TimeframeButtons from './components/TimeframeButtons'
import CryptoChart from './components/CryptoChart'
import { fetchData } from './utils/dataFetch'
import { DataPoint } from './types'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})

const App: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([])
  const [timeframe, setTimeframe] = useState<string>('1w')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<number>(1)

  const getData = async (range: string) => {
    setLoading(true)
    setError(null)
    try {
      const prices = await fetchData(range, false)
      setData(prices)
    } catch (err) {
      setError('Failed to fetch data.')
      const fallbackPrices = await fetchData(range, true)
      setData(fallbackPrices)
    } finally {
      setLoading(false)
    }
  }

  const debouncedGetData = useCallback(debounce((range: string) => {
    getData(range)
  }, 300), [])

  const currentPrice = useMemo(() => {
    return data.length ? data[data.length - 1].value : null
  }, [data])

  const percentageChange = useMemo(() => {
    if (data.length) {
      return ((data[data.length - 1].value - data[0].value) / data[0].value) * 100
    }
    return null
  }, [data])

  useEffect(() => {
    debouncedGetData(timeframe)
  }, [timeframe, debouncedGetData])

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setActiveTab(newValue)
  }, [])

  const PriceDisplay: React.FC = () => (
    <>
      <Typography variant="h3" component="h1" fontWeight="bold">
        {currentPrice ? `$${currentPrice.toFixed(2)} USD` : <Skeleton />}
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mt: 2, color: percentageChange && percentageChange > 0 ? 'green' : 'red' }}
      >
        {percentageChange !== null ? `${percentageChange.toFixed(2)}%` : <Skeleton />}
      </Typography>
    </>
  )

  const ControlButtons: React.FC = () => (
    <Grid container alignItems="center" sx={{ mt: 4 }}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
            Fullscreen
          </Typography>
          <IconButton sx={{ ml: 4 }}>
            <CompareArrowsIcon />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
            Compare
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TimeframeButtons timeframe={timeframe} onSelect={setTimeframe} />
      </Grid>
    </Grid>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4 }}>
        <TabNavigation activeTab={activeTab} onChange={handleTabChange} />

        {activeTab === 1 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <PriceDisplay />
            <ControlButtons />
            <Box sx={{ mt: 6 }}>
              <CryptoChart data={data} loading={loading} error={error} />
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" component="h2">
              {activeTab === 0 ? 'Summary Content' : ''}
              {activeTab === 2 ? 'Statistics Content' : ''}
              {activeTab === 3 ? 'Analysis Content' : ''}
              {activeTab === 4 ? 'Settings Content' : ''}
            </Typography>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App

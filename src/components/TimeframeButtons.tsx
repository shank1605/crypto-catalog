import React from 'react'
import { Button, ButtonGroup } from '@mui/material'

interface TimeframeButtonsProps {
  timeframe: string
  onSelect: (range: string) => void
}

const TimeframeButtons: React.FC<TimeframeButtonsProps> = ({ timeframe, onSelect }) => {
  const timeframes = ['1d', '3d', '1w', '1m', '6m', '1y', 'max']

  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {timeframes.map((range) => (
        <Button
          key={range}
          onClick={() => onSelect(range)}
          variant={timeframe === range ? 'contained' : 'outlined'}
        >
          {range}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default TimeframeButtons

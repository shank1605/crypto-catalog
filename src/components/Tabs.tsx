import React from 'react'
import { Tabs, Tab, Box } from '@mui/material'

interface TabsProps {
  activeTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabNavigation: React.FC<TabsProps> = ({ activeTab, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={activeTab} onChange={onChange} aria-label="navigation tabs">
        <Tab label="Summary" />
        <Tab label="Chart" />
        <Tab label="Statistics" />
        <Tab label="Analysis" />
        <Tab label="Settings" />
      </Tabs>
    </Box>
  )
}

export default TabNavigation

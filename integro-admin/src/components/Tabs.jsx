import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tabs as MUITabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';

export default function Tabs({ value, onChange, tabs = [], Panel, onClick }) {
  return (
    <MUITabs value={value} onChange={(e, v) => onChange(v)}>
      <TabsList>
        {tabs.map((x) => (
          <Tab value={x.type} key={x.type}>
            {x.label}
          </Tab>
        ))}
        <Button
          sx={{ position: 'absolute', top: 0, right: 0, color: 'white', height: '100%' }}
          variant="text"
          onClick={onClick}>
          +
        </Button>
      </TabsList>
      {tabs.map((x, i) => (
        <TabPanel value={x.type} key={x.type}>
          {<Panel index={i} />}
        </TabPanel>
      ))}
    </MUITabs>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  position: relative;
  min-width: 400px;
  min-height: 40px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `
);

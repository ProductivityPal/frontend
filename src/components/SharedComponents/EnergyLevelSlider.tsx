import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Low',
  },
  {
    value: 50,
    label: 'Medium',
  },
  {
    value: 100,
    label: 'High',
  },
];

type SliderProps = {
  sendEnergy: (value: any) => void;
}

export default function DiscreteSliderMarks(props: SliderProps) {
  const [energyValue, setEnergyValue] = useState('MEDIUM')

  function valuetext(value: number) {
    return `${value}`;
  }

  function convertToEnergy(value: any) {
    switch (value) {
      case 0:
        return "LOW"
      case 50:
        return "MEDIUM"
      case 100:
        return "HIGH"
    }
  }

  const accentStyle = {
    color: '#EE7F3B',
  }

  return (
    <Slider
      sx={accentStyle}
      aria-label="Custom marks"
      defaultValue={50}
      getAriaValueText={valuetext}
      step={50}
      valueLabelDisplay="auto"
      marks={marks}
      onChange={(e, value) => props.sendEnergy(convertToEnergy(value))}
    />
  );
}
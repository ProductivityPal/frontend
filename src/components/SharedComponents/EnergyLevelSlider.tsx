import React from 'react';
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
  
  function valuetext(value: number) {
    return `${value}`;
  }

  export default function DiscreteSliderMarks() {
    return (
        <Slider
          aria-label="Custom marks"
          defaultValue={50}
          getAriaValueText={valuetext}
          step={50}
          valueLabelDisplay="auto"
          marks={marks}
        />
    );
  }
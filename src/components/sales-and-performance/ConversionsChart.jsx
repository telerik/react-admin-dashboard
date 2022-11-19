import * as React from 'react';
import { CircularGauge } from '@progress/kendo-react-gauges';

const colors = [
  {
    color: '#FF6358',
  },
];
export const ConversionsChart = () => {
  const [value] = React.useState(78);
  const [secondValue] = React.useState(20);

  const arcOptions = {
    value: value,
    colors,
    transitions: false,
  };


  const arcSecondOptions = {
    value: secondValue,
    colors,
    transitions: false,
  };
  
  const arcCenterRenderer = (color) => {
    return (
      <h3
        style={{
          color: color,
        }}
      >
        +3.1K
      </h3>
    );
  };

  const secondArcCenterRenderer = (color) => {
    return (
      <h3
        style={{
          color: '#666666'
        }}
      >
        -1.2K
      </h3>
    );
  };
  return (
    <div>
       <div className="circular-gauge-container">
       <CircularGauge {...arcOptions} arcCenterRender={arcCenterRenderer}  style={{height: '120px'}}
  scale={{
          startAngle: 250,
        }}/>
         <div>
        
       </div>
       <CircularGauge {...arcSecondOptions} arcCenterRender={secondArcCenterRenderer}  style={{height: '120px'}}
  scale={{
          startAngle: 300,
        }}/>
         <div>
      
         </div>
    </div>
    </div>
  );
};

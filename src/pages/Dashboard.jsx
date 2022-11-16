import * as React from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import { ArcGauge } from '@progress/kendo-react-gauges';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxisItem, ChartCategoryAxis, ChartLegend} from '@progress/kendo-react-charts';
import { trendSeries } from '../data/trendSeries.js';
import { volumeSeries } from '../data/volumeSeries.js';

const colors = [
  {
    color: '#0058e9',
  },
];
const ArcGaugeComponent = () => {
  const [value] = React.useState(50);

  const arcOptions = {
    value: value,
    colors,
  };
  const arcCenterRenderer = (value, color) => {
    return (
      <h3
        style={{
          color: color,
        }}
      >
        {value}%
      </h3>
    );
  };
  return <div style={{
    height: '150px',
  }}>
    <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />
  </div>;
};

const tiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Tasks On Track',
    body: <div className="dashboard-card-content">
      <p className="dashboard-card-content-number green">22</p>
      <div>
        <p className="footer">
        In Backlog: 43
        </p>
      </div>
    </div>,
    
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Overdue Tasks',
    body: <div className="dashboard-card-content">
    <p className="dashboard-card-content-number red">7</p>
    <div>
    <p className="footer">
    From Yesterday: 16
    </p>
    </div>
  </div>,
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Issues',
    body: <div className="dashboard-card-content">
    <p className="dashboard-card-content-number orange">47</p>
    <div>
    <p className="footer">
    Closed By Team 15
    </p>
    </div>
  </div>,
  },
  {
    defaultPosition: {
      col: 4,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Used Space',
    body: <div className="gauge-div">
    <ArcGaugeComponent/>
    <p className="gauge-footer">
    Closed By Team 15
    </p>
  </div>,
 

  },
];

export  const Dashboard = () => {
  const [chartSeries, setChartSeries] = React.useState(trendSeries);
  const [isTrend, setIsTrend] = React.useState(true);

  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];



  const [range, setRange] = React.useState({
    start: new Date('2020-01-01T21:00:00.000Z'),
    end: new Date('2020-04-29T21:00:00.000Z')
});
  


const trendOnClick = React.useCallback(
  () => {
      setIsTrend(true);
      setChartSeries(trendSeries)

  },
  [setIsTrend]
);

const volumeOnClick = React.useCallback(
  () => {
      setIsTrend(!true);
      setChartSeries(volumeSeries)
  },
  [setIsTrend]
);

const onRangeChange = React.useCallback(
  (event) => {
      setRange({
          start: event.value.start,
          end: event.value.end
      })
  },
  [setRange]
);

  return (
    <div>
      <div className="greeting">
      Hello again, Jaxons!
    </div>
    <div className="card-container grid">

    <div className="cards-layout-container">
    <TileLayout columns={4} items={tiles} rowHeight={230} />
    <div className="chart-container">

   <div className="k-card">
    
   <div className="card-buttons">
   <p>Total Points</p>
      <div>
      <DateRangePicker  value={range} onChange={onRangeChange}/>

      </div>
   <div className="card-ranges">
                </div>
      <ButtonGroup>
      <Button togglable={true} selected={isTrend} onClick={trendOnClick}>
            Trend
          </Button>
          <Button togglable={true} selected={!isTrend} onClick={volumeOnClick}>
            Volume
          </Button>
      </ButtonGroup>
   </div>
   <Chart style={{
          height: 350
        }}>
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories}  />
            </ChartCategoryAxis>
            <ChartSeries>
              {chartSeries.map((item, idx) => <ChartSeriesItem key={idx} type="line" tooltip={{
              visible: true
            }} data={item.data} name={item.name} />)}
            </ChartSeries>
          </Chart>
          </div>
    </div>
    </div>
    </div>
    </div>
  );
};



import * as React from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import { ArcGauge } from '@progress/kendo-react-gauges';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { useTableKeyboardNavigation } from '@progress/kendo-react-data-tools';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxisItem, ChartCategoryAxis, ChartLegend} from '@progress/kendo-react-charts';
import { trendSeries } from '../data/trendSeries.js';
import { volumeSeries } from '../data/volumeSeries.js';
import {
  Grid,
  GridColumn as Column,
  getSelectedState,
  GridToolbar,
  GRID_COL_INDEX_ATTRIBUTE
} from '@progress/kendo-react-grid';
import { Rating } from '@progress/kendo-react-inputs';
import { getter } from '@progress/kendo-react-common';
import firstTeam from '../data/firstTeam.json';
import { Input } from '@progress/kendo-react-inputs';
import {
  process,
} from '@progress/kendo-data-query';

const DATA_ITEM_KEY = 'PersonID';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

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
  
  const [filterValue, setFilterValue] = React.useState();
  const [filteredSampleProducts, setFilteredSampleProducts] =
    React.useState(firstTeam);
  const [dataState, setDataState] = React.useState({ take: 5, skip: 0 });
  const [dataResult, setDataResult] = React.useState(
    process(
      firstTeam.map((dataItem) =>
        Object.assign(
          {
            selected: false,
          },
          dataItem
        )
      ),
      dataState
    )
  );

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
  

  const [selectedState, setSelectedState] = React.useState({});

  const onSelectionChange = React.useCallback(
    (event) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  const onFilterChange = (ev) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = firstTeam.filter((item) => {
      let match = false;
      for (const property in item) {
        if (
          item[property]
            .toString()
            .toLocaleLowerCase()
            .indexOf(value.toLocaleLowerCase()) >= 0
        ) {
          match = true;
        }
        //ensure that toLocaleDateString matches with the displayed format in the Column
        //if not, modify the logic so that you can compare same string from the cell with the input
        if (
          item[property].toLocaleDateString &&
          item[property].toLocaleDateString().indexOf(value) >= 0
        ) {
          match = true;
        }
      }
      return match;
    });

    setFilteredSampleProducts(newData);
    let clearedPagerDataState = { ...dataState, take: dataState.take, skip: 0 };
    let processedData = process(newData, dataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
  };

  const getHighlight = (value, filter) => {
    let index = value
      .toLocaleLowerCase()
      .indexOf(filterValue.toLocaleLowerCase());
    if (index >= 0) {
      let left = value.substr(0, index);
      let right = value.substring(index + filter.length, value.length);
      return (
        <React.Fragment>
          {left}
          <span className="highligth">
            {value.substr(index, filter.length)}
          </span>
          {getHighlight(right, filter)}
        </React.Fragment>
      );
    }
    return value;
  };

  const cellRender = React.useCallback(
    (td, props) => {
      const value = td.props.children;
      if (
        filterValue &&
        filterValue.length > 0 &&
        value.substr &&
        value.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) >= 0
      ) {
        const children = getHighlight(value, filterValue.toLocaleLowerCase());
        return React.cloneElement(td, [props], [children]);
      }
      return td;
    },
    [filterValue]
  );

  const onHeaderSelectionChange = React.useCallback((event) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState = {};
    event.dataItems.forEach((item) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  const dataStateChange = (event) => {
    setDataResult(process(filteredSampleProducts, event.dataState));
    setDataState(event.dataState);
  };

  const RatingCell = (props) => {
    const field = props.field || '';
    const value = props.dataItem[field];
    return (
      <td>
        <Rating
          defaultValue={value === null ? '' : props.dataItem[field].toString()}
          readonly={true}
          style={{
            height: '100px',
          }}
        />
      </td>
    );
  };

  const PersonCell = (props) => {
    const field = props.field || '';
    const value = props.dataItem[field];

    return (
      <td>
      <img src={require('../assets/people/Joey.png')} alt="Girl in a jacket" width="34" height="34"/>
       <span className="person-name">{ value === null ? '' : props.dataItem[field].toString()}</span>
      </td>
    );
  }

  const BudgetCell = props => {
    const field = props.field || '';
    const value = props.dataItem[field];
    const navigationAttributes = useTableKeyboardNavigation(props.id);
    return <td style={{
      color: value > 0 ? props.myProp[0].color : props.myProp[1].color
    }} colSpan={props.colSpan} role={'gridcell'} aria-colindex={props.ariaColumnIndex} aria-selected={props.isSelected} {...{
      [GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex
    }} {...navigationAttributes}>
        ${value === null ? '' : props.dataItem[field].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>;
  };
  const customData = [{
    color: ''
  }, {
    color: 'red'
  }];

  const CustomBudgetCell = props => <BudgetCell {...props} myProp={customData} />;

  let _pdfExport;
  const exportExcel = () => {
    _export.save();
  };
  let _export;

  const exportPDF = () => {
    _pdfExport.save();
  };

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
    <div className="grid-container">
    
    <ExcelExport data={firstTeam} ref={exporter => {
      _export = exporter;
    }}>
    <Grid
    sortable={true}
    cellRender={cellRender}
    data={dataResult.data.map((item) => ({
      ...item,
      [SELECTED_FIELD]: selectedState[idGetter(item)],
    }))}
    total={dataResult.total}
    {...dataState}
    onDataStateChange={dataStateChange}
    pageable={true}
    dataItemKey={DATA_ITEM_KEY}
    selectedField={SELECTED_FIELD}
    selectable={{
      enabled: true,
      drag: false,
      cell: false,
      mode: 'multiple',
    }}
    onSelectionChange={onSelectionChange}
    onHeaderSelectionChange={onHeaderSelectionChange}
  >
    <GridToolbar className="toolbar">
      <div>
        <span>
          <Input
            value={filterValue}
            onChange={onFilterChange}
            style={{
              border: '2px solid #ccc',
              boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
              width: '124px',
              height: '24px',
            }}
          />
        </span>
        <div className="export-buttons-container">
        <button title="Export to Excel" className="k-grid-excel k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportExcel}>
        <span class="k-icon k-i-file-excel k-button-icon"></span> Export to Excel
       </button>&nbsp;

      <button className="k-grid-pdf k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportPDF}>
      <span class="k-icon k-i-file-pdf k-button-icon"></span>  Export to PDF
     </button>
      </div>
       
      </div>
    </GridToolbar>
    <Column
      field={SELECTED_FIELD}
      width="50px"
      headerSelectionValue={
        dataResult.data.findIndex(
          (item) => !selectedState[idGetter(item)]
        ) === -1
      }
    />
    <Column field="FullName" title="FullName" cell={PersonCell}/>
    <Column field="JobTitle" title="Job Title" />
    <Column field="Rating" title="Rating" cell={RatingCell} width="300px" />
    <Column field="Budget" title="Budget" cell={CustomBudgetCell}/>
  </Grid>
  </ExcelExport>
  <GridPDFExport ref={element => {
    _pdfExport = element;
  }} margin="1cm">
            {<Grid data={process(firstTeam, {
      skip: dataState.skip,
      take: dataState.take
    })}>
    <Column field="FullName" title="FullName" cell={PersonCell}/>
    <Column field="JobTitle" title="Job Title" />
    <Column field="Rating" title="Rating" cell={RatingCell} width="300px" />
    <Column field="Budget" title="Budget" cell={CustomBudgetCell}/>
        </Grid>}
    </GridPDFExport>
  
    </div>
    </div>
    </div>
    </div>
  );
};



import * as React from 'react';
import {
  Grid,
  GridColumn as Column,
  getSelectedState,
  GRID_COL_INDEX_ATTRIBUTE,
  GridToolbar

} from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { getter } from '@progress/kendo-react-common';
import firstTeam  from '../../data/firstTeam.json'
import { Rating } from '@progress/kendo-react-inputs';
import { ColumnMenu } from '../dashboard/ColumnMenu';
import { useTableKeyboardNavigation } from '@progress/kendo-react-data-tools';
import { Input } from '@progress/kendo-react-inputs';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';


const DATA_ITEM_KEY = 'orderID';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

export const DashboardGrid = () => {

  const [selectedState, setSelectedState] = React.useState({});
  const [collapsedGroups, setCollapsedGroups] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [person, setPerson] = React.useState('Joey.png');
  const [filterValue, setFilterValue] = React.useState();
  const [filteredSampleProducts, setFilteredSampleProducts] =
    React.useState(firstTeam);

    const _export = React.useRef(null);

  const [dataState, setDataState] = React.useState({
   skip: 0,
   take: 8,
   sort: [
     {
       field: 'orderDate',
       dir: 'desc',
     },
   ],
   group: [],
 });

 const [dataResult, setDataResult] = React.useState(
  process(filteredSampleProducts, dataState)
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
  let clearedPagerDataState = { ...dataState, take: 8, skip: 0 };
  let processedData = process(newData, clearedPagerDataState);
  setDataResult(processedData);
  setDataState(clearedPagerDataState);
};


  React.useEffect(() => {
    setData(firstTeam);
  }, []);

  const dataStateChange = (event) => {
    setDataResult(process(filteredSampleProducts, event.dataState));
    setDataState(event.dataState);
  };

  const expandChange = (event) => {
    if (!event.dataItem.aggregates) {
      let newData = data.map((item) => {
        if (item[DATA_ITEM_KEY] === event.dataItem[DATA_ITEM_KEY]) {
          item.expanded = !event.dataItem.expanded;
        }

        return item;
      });
      setData(newData);
    } else {
      let groupId = event.dataItem.field + '_' + event.dataItem.value;
      if (!collapsedGroups.includes(groupId)) {
        setCollapsedGroups([...collapsedGroups, groupId]);
      } else {
        setCollapsedGroups(collapsedGroups.filter((gr) => gr !== groupId));
      }
    }
    setDataResult({ ...dataResult });

  };

  const onSelectionChange = (event) => {
    let targetEl = event.nativeEvent.target;
    let isDetail = false;
    while (targetEl.tagName !== 'BODY') {
      if (targetEl.tagName === 'TR') {
        if (targetEl.className.indexOf('k-detail-row') >= 0) {
          isDetail = true;
          break;
        }
      }
      targetEl = targetEl.parentNode;
    }
    if (!isDetail) {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
      let newData = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: newSelectedState[idGetter(item)],
      }));
      setData(newData);
    }
  };

  const RatingCell = (props) => {
   const field = props.field || '';
   const value = props.dataItem[field];
   return (
     <td>
       <Rating
         value={value === null ? '' : props.dataItem[field]}
         readonly={true}
       />
     </td>
   );
 };
 
 const PersonCell = (props) => {
   const field = props.field || '';
   const value = props.dataItem[field];
 
   return (
     <td>
     <img src={require(`../../assets/people/${person}`)} alt="Girl in a jacket" width="34" height="34"/>
      <span className="person-name">{ value === null ? '' : props.dataItem[field]}</span>
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
       ${value === null ? '' : props.dataItem[field]}
     </td>;
 };
 const customData = [{
   color: ''
 }, {
   color: 'red'
 }];

 let _pdfExport;

 const excelExport = () => {
  if (_export.current !== null) {
    _export.current.save();
  }
};

const exportPDF = () => {
  _pdfExport.save();
};

 const CustomBudgetCell = props => <BudgetCell {...props} myProp={customData} />;

  return (
    <div> 
      <div>
        <p style={{
          fontSize: '20px',
          // lineHeight: '24px',
          marginBottom: '40px',
          color: '#000000'
        }}>  MK Team</p>
      </div>
       <div style={{float: 'right', marginTop: '-60px'}}> 
         <ButtonGroup>
         <Button togglable={true}>
               My Team
             </Button>
             <Button togglable={true}>
               All Teams
             </Button>
         </ButtonGroup>
       </div>
        <GridToolbar className="toolbar">
     <div>
       <span>
         <Input
           value={filterValue}
           onChange={onFilterChange}
           style={{
             border: '2px solid #ccc',
             boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
             width: '150px',
             height: '30px',
             marginRight: '10px'
           }}
           placeholder='Search'
         />
       </span>
       <div className="export-buttons-container">
       <button title="Export to Excel" className="k-grid-excel k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={excelExport} style={{marginRight: '10px'}}>
       <span className="k-icon k-i-file-excel k-button-icon"></span> Export to Excel
      </button>&nbsp;

     <button className="k-grid-pdf k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportPDF}>
     <span className="k-icon k-i-file-pdf k-button-icon"></span>  Export to PDF
    </button>
     </div>
      
     </div>
   </GridToolbar>
   <ExcelExport
        data={firstTeam}
        ref={_export}
        group={dataState.group}
        >
      <Grid
        sortable={true}
        filterable={true}
        groupable={true}
        reorderable={true}
        pageable={{
          buttonCount: 4,
          pageSizes: true,
        }}
        data={dataResult}
        {...dataState}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={true}
        onDataStateChange={dataStateChange}
        expandField="expanded"
        onExpandChange={expandChange}
        onSelectionChange={onSelectionChange}
      >
     <Column
     field={SELECTED_FIELD}
     width="50px"

   />
  <Column title="Employee">
   <Column field="FullName" title="Contact Name" cell={PersonCell} columnMenu={ColumnMenu}/>
   <Column field="JobTitle" title="Job Title" columnMenu={ColumnMenu}/>
  </Column>

  <Column title="Performance">
    <Column field="Rating" title="Rating" cell={RatingCell} width="300px" columnMenu={ColumnMenu}/>
    <Column field="Budget" title="Budget" cell={CustomBudgetCell} columnMenu={ColumnMenu}/> 
   </Column>
      </Grid>
      </ExcelExport>
      <GridPDFExport ref={element => {
          _pdfExport = element;
        }} margin="1cm">
          {
           <Grid
           sortable={true}
           filterable={true}
           groupable={true}
           reorderable={true}
           pageable={{
             buttonCount: 4,
             pageSizes: true,
           }}
           data={dataResult}
           {...dataState}
           dataItemKey={DATA_ITEM_KEY}
           selectedField={SELECTED_FIELD}
           selectable={true}
           onDataStateChange={dataStateChange}
           expandField="expanded"
           onExpandChange={expandChange}
           onSelectionChange={onSelectionChange}
           >
          <Column
          field={SELECTED_FIELD}
          width="50px"/>
      
          <Column title="Employee">
           <Column field="FullName" title="Contact Name" cell={PersonCell} columnMenu={ColumnMenu}/>
           <Column field="JobTitle" title="Job Title" columnMenu={ColumnMenu}/>
          </Column>
        
          <Column title="Performance">
            <Column field="Rating" title="Rating" cell={RatingCell} width="300px" columnMenu={ColumnMenu}/>
            <Column field="Budget" title="Budget" cell={CustomBudgetCell} columnMenu={ColumnMenu}/> 
           </Column>
              </Grid>
           }
       </GridPDFExport>
    </div>
  );
};
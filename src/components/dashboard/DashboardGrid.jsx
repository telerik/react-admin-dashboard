import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Grid,
  GridColumn as Column,
  getSelectedState,
  getSelectedStateFromKeyDown,
  GRID_COL_INDEX_ATTRIBUTE,
  GridToolbar

} from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { mapTree } from '@progress/kendo-react-treelist';
import { getter } from '@progress/kendo-react-common';
import {
  setExpandedState,
  setGroupIds,
} from '@progress/kendo-react-data-tools';
import firstTeam  from '../../data/firstTeam.json'
import { Rating } from '@progress/kendo-react-inputs';
import { ColumnMenu } from '../dashboard/ColumnMenu';
import { useTableKeyboardNavigation } from '@progress/kendo-react-data-tools';
import { Input } from '@progress/kendo-react-inputs';


const DATA_ITEM_KEY = 'orderID';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

export const DashboardGrid = () => {

  const [selectedState, setSelectedState] = React.useState({});
  const [collapsedGroups, setCollapsedGroups] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [person, setPerson] = React.useState('Joey.png');
  const [filterValue, setFilterValue] = React.useState();
  const [filteredPeople, setFilteredSampleProducts] =
  React.useState(firstTeam);
  const [dataState, setDataState] = React.useState({
   skip: 0,
   take: 20,
   sort: [
     {
       field: 'orderDate',
       dir: 'desc',
     },
   ],
   group: [
     
   ],
 });

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
 
       if (
         item[property].toLocaleDateString &&
         item[property].toLocaleDateString().indexOf(value) >= 0
       ) {
         match = true;
       }
     }
     return match;
   });
 
   filteredPeople(newData);
   let clearedPagerDataState = { ...dataState, take: dataState.take, skip: 0 };
   let processedData = process(newData, dataState);
   setDataResult(processedData);
   setDataState(clearedPagerDataState);
 };

 
  

  React.useEffect(() => {
    setData(firstTeam);
  }, []);

  const dataStateChange = (event) => {
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
  };

  const onSelectionChange = (event) => {
    let targetEl = event.nativeEvent.target;
    let isDetail = false;
    while (targetEl.tagName != 'BODY') {
      if (targetEl.tagName == 'TR') {
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
  const handleGroupState = (props) => {
    return {
      data: mapTree(props.data, 'items', (group) => {
        if (!group.aggregates) return group;
        let groupId = group.field + '_' + group.value;
        return { ...group, expanded: !collapsedGroups.includes(groupId) };
      }),
      total: props.total,
    };
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
const exportExcel = () => {
  _export.save();
};
let _export;

const exportPDF = () => {
  _pdfExport.save();
};
 
 const CustomBudgetCell = props => <BudgetCell {...props} myProp={customData} />;

  return (
    <div>
        <GridToolbar className="toolbar">
     <div>
       <span>
         <Input
           value={filterValue}
           onChange={onFilterChange}
           style={{
             border: '2px solid #ccc',
             boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
             width: '200px',
             height: '24px',
           }}
           placeholder='Search in all columns'
         />
       </span>
       <div className="export-buttons-container">
       <button title="Export to Excel" className="k-grid-excel k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportExcel}>
       <span className="k-icon k-i-file-excel k-button-icon"></span> Export to Excel
      </button>&nbsp;

     <button className="k-grid-pdf k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportPDF}>
     <span className="k-icon k-i-file-pdf k-button-icon"></span>  Export to PDF
    </button>
     </div>
      
     </div>
   </GridToolbar>
      <Grid
        style={{
          height: '700px',
        }}
        sortable={true}
        filterable={true}
        groupable={true}
        reorderable={true}
        pageable={{
          buttonCount: 4,
          pageSizes: true,
        }}
        data={handleGroupState(process(data, dataState))}
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
    </div>
  );
};
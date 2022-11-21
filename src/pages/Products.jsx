import * as React from 'react';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Input } from '@progress/kendo-react-inputs';

import {
  Card,
  CardTitle,
  CardImage,
  CardActions,
  CardBody,
} from '@progress/kendo-react-layout';
import { Pager } from '@progress/kendo-react-data-tools';
import articles from '../data/articles.json';
import { BubbleChart } from "../components/products/BubbleChart"


 const MyItemRender = (props) => {
   let item = props.dataItem;
   return (
     <div
       style={{
       
         padding: '20px 20px',
       }}
       className="parent-container"
     >
       <div className="k-card-list">
         <Card
           style={{
             width: 260,
             height: 340
           }}
         >
           <CardBody
           style={{
            borderBottom: 'solid 1px rgba(0,0,0,.08)'
           }}
           >
             <CardImage
               src={require(`../assets/article-images/${item.Image}`)}
               style={{
                 width: 260,
                 height: 140,
                 maxWidth: 260,
               }}
             />
             <CardTitle
               style={{
                 fontSize: 18,
               }}
             />
             <CardTitle>{item.Title}</CardTitle>
             <CardTitle>{item.Subtitle}</CardTitle>
             <p>
               Some quick example text to build on the card title and make up the
               bulk of the card content.
             </p>
           </CardBody>
           <CardActions>
           <div className="footer-buttons-container">
                <span>
                    <span className="k-button k-button-md k-button-rectangle k-rounded-md k-button-flat k-button-flat-base">
                        <span className="k-icon k-i-preview"></span>Review
                    </span>
                </span>
                <span>
                    <span className="k-button k-edit-button k-button-md k-button-rectangle k-rounded-md k-button-flat k-button-flat-primary">
                        <span className="k-icon k-i-edit"></span>Edit
                    </span>
                </span>
            </div>
           </CardActions>
         </Card>
       </div>
     </div>
   );
 };

export const Products = () => {
  const [filteredList, setFilteredList] = React.useState(articles);
  const [value, setValue] = React.useState('');


   const [page, setPage] = React.useState({
      skip: 0,
      take: 10,
    });
    
    const handlePageChange = (e) => {
      setPage({
        skip: e.skip,
        take: e.take,
      });
    };

    const handleChange = React.useCallback((event) => {
      setValue(event.target.value);
      const results = articles.filter(post => {
         if (event.target.value === "") return articles
         return post.Title.includes(event.target.value)
     })
      console.log(results)
     setFilteredList(results)
    });


    const { skip, take } = page;

   return <div>
      <div className="chart-container">
        <br/>
        <br/>
        <BubbleChart/>
      </div>

      <div className="input-container">
      <Input
        style={{
          border: '2px solid #ccc',
          boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
        }}
        placeholder={'Search'}
        value={value}
        onChange={handleChange}
      />
      </div>

      <div className="listbox-card-container">
      <ListView
        data={filteredList.slice(skip, skip + take)}
        item={MyItemRender}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <Pager
        skip={skip}
        take={take}
        onPageChange={handlePageChange}
        total={articles.length}
      />
      </div>
   </div>
}
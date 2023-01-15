import * as React from "react";
import { Card, CardTitle, CardBody } from '@progress/kendo-react-layout';
import { FinancialForm } from "../settings/FinancialForm";


export const Cards = () => {

    
   return <div>
   <div>
   <p style={{
      color: '#8F8F8F',
      padding: '3px 0px 0px 0px',
      textTransform: 'uppercase',
      fontSize: '12px'
     }}>Change your plan</p>
      <div className={'k-card-deck'}>
        
        <Card
          style={{
            width: 293,
            height: 163,
          }}
        >
          <CardBody>
            <CardTitle
             style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
             }}
            >Starter</CardTitle>
            <CardTitle
             style={{
               fontFamily: 'Roboto',
               fontWeight: '300',
               fontSize: '28px',
               lineHeight: '37px',
               textAlign: 'center',
               marginTop: '22px'
             }}
            >Free</CardTitle>
            <p style={{
               marginTop: '30px',
               color: '#8F8F8F',
               fontSize: '12px',
               textTransform: 'uppercase'
            }}>Starter plan for individuals.</p>
          </CardBody>
        </Card>
        <Card
          style={{
            width: 293,
            height: 163,
          }}
        >
          <CardBody>
            <CardTitle
               style={{
                  fontFamily: 'Roboto',
                  fontWeight: '400',
                  fontSize: '20px',
                 }}
            >Team </CardTitle>
            <CardTitle
               style={{
                  fontFamily: 'Roboto',
                  fontWeight: '300',
                  fontSize: '28px',
                  lineHeight: '37px',
                  textAlign: 'center',
                  marginTop: '22px'
               }}
            >$20/Month</CardTitle>
            <p
             style={{
              marginTop: '30px',
              color: '#8F8F8F',
               fontSize: '12px'
            }}
            >COLLABORATE UP TO 16 PEOPLE</p>
          </CardBody>
        </Card>
        <Card
          style={{
            width: 293,
            height: 163,
            fontFamily: 'Roboto',
            fontWeight: '400',
            fontSize: '20px',
          }}
        >
          <CardBody>
            <CardTitle
             style={{
               fontFamily: 'Roboto',
               fontWeight: '400',
               fontSize: '20px',
             }}
            >Enterprise</CardTitle>
            <CardTitle
            style={{
               fontFamily: 'Roboto',
               fontWeight: '300',
               fontSize: '28px',
               lineHeight: '37px',
               textAlign: 'center',
               marginTop: '22px'
             }}
            >$40/Month</CardTitle>
            <p
             style={{
              marginTop: '30px',
              color: '#8F8F8F',
               fontSize: '12px'
            }}
            >FOR BIGGER BUSINESSES</p>
          </CardBody>
        </Card>

        <br/>
    </div>
    </div>
    <br></br>
    <br></br>

 <FinancialForm/>
   </div>
}
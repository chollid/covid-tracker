// import React from 'react'
// import { Card, CardContent, Typography } from "@material-ui/core"
// import '../css/InfoBox.css';

// // onClick is passed down through "...props" spread operator
// function InfoBox({ title, cases, total, ...props }) {
//     return (
//         <Card 
//         onClick={props.onClick}
//         className="infoBox">
//             <CardContent>
     
//                 <Typography className="infoBox__title" color="textSecondary">
//                     {title}
//                 </Typography>

//                 <h2 className="infoBox__cases">{cases}</h2>
       
//                 <Typography className="infoBox__total" color="textSecondary">
//                     {total} Total
//                 </Typography>
              
//             </CardContent>
//         </Card>
//     )
// }

// export default InfoBox





/************************************** */





  
import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../css/InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
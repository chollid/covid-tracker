// import React from 'react'
// import numeral from 'numeral';
// import "../css/Table.css";

// function Table({ countries }) {
//     return (
//         <div className="table">
//             {countries.map(({ country, cases } )=> (
//                 <tr>
//                     <td>{country}</td>
//                     <td>
//                     {/* Add little biohazard icon next to number */}
//                     <strong>{numeral(cases).format("0,0")}</strong>
//                     </td>
//                 </tr>
//             ))}
//         </div>
//     )
// }

// export default Table



/****************************** */



  
import React from "react";
import "../css/Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
// import React from 'react'
// import {Pagination} from "@mui/material";
// const Pagepagination = () => {
//   return (
//     <div>
//       <Pagination count={3} color="primary" />
//     </div>
//   )
// }

// export default Pagepagination

import React from 'react'
import { Pagination } from "@mui/material";

const Pagepagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <div className="flex justify-center my-8">
      <Pagination 
        count={totalPages} 
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default Pagepagination
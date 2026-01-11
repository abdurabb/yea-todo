import { Pagination, ThemeProvider } from '@mui/material';
import React from 'react'
import theme from './PageTheme';

function PageNation({ totalPage, setPage, currentPage = 1 }) {
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="flex justify-end">
      <ThemeProvider theme={theme}>
        <Pagination
          variant="outlined"
          shape="rounded"
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
        />
      </ThemeProvider>
    </div>
  );
}

export default React.memo(PageNation);

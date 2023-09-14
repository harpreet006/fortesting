export const options = {
    filterType: "checkbox",
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: true,
    pagination: true,
    // page:3,
    rowsPerPage: [10],
    rowsPerPageOptions:[10],
    setRowProps: row => {
      if (row[0] %2 === 0) {
        return {
          style: { background: "#f8f6f1" }
        };
      }
    },
    responsive: 'scrollMaxHeight',

  };

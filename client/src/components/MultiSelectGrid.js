import React, {useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField
} from "@mui/material";
import Filter from "./Filter";

function MultiSelectGrid(props) {


  const { data, filterConfig, columnConfig, initialSelected } = props;

  const initialFilters = {};
  filterConfig.forEach((filter) => {
    initialFilters[filter.dataPath] = "";
  });

  const [selected, setSelected] = React.useState(initialSelected);
  const [filters, setFilters] = React.useState(initialFilters);


  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleFilterChange = (event, dataPath) => {
    setFilters({
      ...filters,
      [dataPath]: event.target.value
    });
  };

  const filterRows = (rows) => {
    return rows.filter(row => {
      for (let i = 0; i < filterConfig.length; i++) {
        const filter = filterConfig[i];
        const rowValue = row[filter.dataPath];
        const filterValue = filters[filter.dataPath];

        // If filter value is empty, skip this filter
        if (!filterValue) {
          continue;
        }

        // Apply 'equals' filter
        if (filter.filterMethod === 'equals' && rowValue !== filterValue) {
          return false;
        }

        // Apply 'includes' filter
        if (filter.filterMethod === 'includes' && !rowValue.includes(filterValue)) {
          return false;
        }
      }

      // If none of the filters disqualified this row, include it
      return true;
    });
  }

  const filteredRows = filterRows(data);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filteredRows.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const allSelected = filteredRows.length > 0 && selected.length === filteredRows.length;

  return (
    <div style={{width: '100%', padding: 10}}>
      {filterConfig.map((filter, index) => (
        filters &&
        <Filter
          key={index}
          filterConfig={filter}
          value={filters[filter.dataPath]}
          handleFilterChange={handleFilterChange}
        />
      ))}


      <TableContainer component={Paper} style={{width: "100%", marginTop: 10}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={allSelected} onChange={handleSelectAll} />
              </TableCell>
              {columnConfig.map((column, index) => (
                <TableCell key={index}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelect(row.id)}
                    name={'Selected[' + row.id + ']'}
                  />
                </TableCell>
                {columnConfig.map((column, index) => (
                  <TableCell key={index}>{row[column.dataPath]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MultiSelectGrid;

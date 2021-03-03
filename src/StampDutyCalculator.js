import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

// TODO: Add checkbox - this is my second home

// TODO: Move to another file
const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step) + 1).fill(start).map((x, y) => x + y * step);

const marks = range(0, 1000, 100).map(x => {
  return {
    value: x,
    label: `£${x * 1000}`
  }
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const formattedValue = `£${value * 1000}`;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={formattedValue}>
      {children}
    </Tooltip>
  );
}

const useStyles = makeStyles({
  root: {
    width: 1000,
    backgroundColor: '#fafafa',
    padding: '40px'
  },
  table: {
    minWidth: 650,
  },
});

export default function StampDutyCalculator() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // TODO: Move to another file
  function createData(dateRange, stampDuty) {
    const stampDutyFormatted = `£${stampDuty * 1000}`;
    return { dateRange, stampDutyFormatted };
  }
  const rows = [
    createData('Until June', 159),
    createData('July - September', 237),
    createData('October...', 500),
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        House Price (in £k)
      </Typography>
      <Slider
        ValueLabelComponent={ValueLabelComponent}
        value={value}
        onChange={handleChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={1000}
        marks={marks}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.dateRange}>
                <TableCell component="th" scope="row">
                  {row.dateRange}
                </TableCell>
                <TableCell align="right">{row.stampDutyFormatted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Checkbox, ListItemIcon, ListItemText, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Toolbar, Typography, alpha } from "@mui/material";
import { useEffect, useMemo, useState } from "react";


const EnhancedTableToolbar = ({ numSelected, searchChange, handleDeleteData, selected, language }) => {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 && (
                <Typography
                    sx={{ flex: '1 1 10%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            )}

            {numSelected > 0 ? (
                <Box sx={{ display: 'flex' }}>
                    <Button variant="contained" color="error" sx={{ mx: 1 }} onClick={() => handleDeleteData(selected)}>
                        <FontAwesomeIcon size="lg" icon={faTrash} />
                        <Typography sx={{ mx: 1 }}>{language?.delete}</Typography>
                    </Button>
                </Box>

            ) : (
                <TextField id="outlined-basic" label={language?.search} variant="standard" onChange={searchChange} />
            )}
        </Toolbar>
    );
}

const EnhancedTableHead = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, language } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        {
            id: 'nim',
            numeric: false,
            disablePadding: false,
            label: 'NIM',
        },
        {
            id: 'nama',
            numeric: false,
            disablePadding: false,
            label: language?.name
        },
        {
            id: 'keterangan',
            numeric: false,
            disablePadding: false,
            label: language?.info
        }
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ width: 10 }}>
                    <Typography>NO</Typography>
                </TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// eslint-disable-next-line react/prop-types
const TableAbsentComponent = ({ handleRowClick, handleDeleteData, language, data = [] }) => {
    const [selected, setSelected] = useState([]);
    const [tempData, setTempData] = useState(data)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selectedRow, setSelectedRow] = useState(null)
    const [pointerPosition, setPointerPosition] = useState(null)

    const handleSearchChange = (event) => {
        const searchText = event.target.value
        // console.log(searchText);
        setTempData(data.filter(item => item.nama.toLowerCase().includes(searchText.toLowerCase())))
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = tempData.map((n) => n.nim);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (event, property) => {
        console.log(property);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        event.stopPropagation();
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const visibleRows = useMemo(
        () =>
            stableSort(tempData, getComparator(order, orderBy)),
        [getComparator, order, orderBy, tempData],
    );

    const handleMenuOpen = (event, id) => {
        event.preventDefault()
        setPointerPosition(event.target)
        setSelectedRow(data?.find(item => item.nim === id))

    }

    const handleMenuClose = () => {
        setPointerPosition(null)
        setSelectedRow(null)
    }

    const handleMenuDelete = () => {
        handleDeleteData(false, selectedRow?.nim)
        handleMenuClose()
    }

    useEffect(() => {
        setTempData(data)
    }, [data])

    return (
        <Box>
            <EnhancedTableToolbar
                searchChange={handleSearchChange}
                numSelected={selected.length}
                selected={selected}
                handleDeleteData={handleDeleteData}
                language={language}
            />
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={tempData.length}
                        language={language}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.nim);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleRowClick(row.nim)}
                                    onContextMenu={(e) => handleMenuOpen(e, row.nim)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    key={row.nim}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center" padding="none">{index + 1}</TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            onClick={(event) => handleClick(event, row.nim)}
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.nim}
                                    </TableCell>
                                    <TableCell align="left">{row.nama}</TableCell>
                                    <TableCell align="left">{row.keterangan}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={pointerPosition}
                open={Boolean(pointerPosition)}
                onClose={handleMenuClose}
                keepMounted
            >
                <MenuItem onClick={handleMenuDelete}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faTrash} />
                    </ListItemIcon>
                    <ListItemText primary='Delete' />
                </MenuItem>
            </Menu>
        </Box>
    )

}

export default TableAbsentComponent
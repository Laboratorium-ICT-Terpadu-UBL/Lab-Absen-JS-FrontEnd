/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash, faUserPlus, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Checkbox, ListItemIcon, ListItemText, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Typography, alpha } from "@mui/material";
import { useMemo, useState } from "react";

/* eslint-disable no-undef */
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

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
            label: language?.fullName,
        },
        {
            id: 'jurusan',
            numeric: false,
            disablePadding: false,
            label: language?.dept,
        },
        {
            id: 'jabatan',
            numeric: false,
            disablePadding: false,
            label: language?.position,
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: "Status",
        },
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

const checkStatus = (value, master) => {
    const data1 = value.map(item => master.find(data => data.nim === item))
    let aktif = 0
    let non = 0

    data1.forEach(item => {
        if (item.status === "Aktif") {
            aktif++
        } else {
            non++
        }
    })
    if (aktif >= non) {
        return "Aktif"
    } else {
        return "Tidak Aktif"
    }

}

const EnhancedTableToolbar = ({ numSelected, searchChange, handleDisableData, handleEnableData, handleDeleteData, selected, language, data }) => {


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
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 10%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 10%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {language?.dataAsistant}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Box sx={{ display: 'flex' }}>
                    {checkStatus(selected, data) === "Aktif" ? (
                        <Button variant="contained" color="warning" sx={{ mx: 1 }} onClick={() => handleDisableData(selected)}>
                            <FontAwesomeIcon size="lg" icon={faUserSlash} />
                            <Typography sx={{ mx: 1 }}>{language?.disableIt}</Typography>
                        </Button>
                    ) : (
                        <Button variant="contained" color="success" sx={{ mx: 1 }} onClick={() => handleEnableData(selected)}>
                            <FontAwesomeIcon size="lg" icon={faUserPlus} />
                            <Typography sx={{ mx: 1 }}>{language?.enableit}</Typography>
                        </Button>
                    )}

                    <Button variant="contained" color="error" sx={{ mx: 1 }} onClick={() => handleDeleteData(selected)}>
                        <FontAwesomeIcon size="lg" icon={faTrash} />
                        <Typography sx={{ mx: 1 }}>{language?.delete}</Typography>
                    </Button>
                </Box>

            ) : (
                <TextField id="outlined-basic" label={`${language?.search} ${language?.name}`} variant="standard" onChange={searchChange} />
            )}
        </Toolbar>
    );
}

// eslint-disable-next-line react/prop-types
const TableMainComponent = ({ handler, language, data = [] }) => {
    // eslint-disable-next-line react/prop-types
    const { handleDeleteData, handleDisableData, handleEnableData, handleEditOpenModal, handleRowClick, } = handler
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('nim');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRow, setSelectedRow] = useState(null)
    const [tempData, setTempData] = useState(data)
    const [pointerPosition, setPointerPosition] = useState(null)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = tempData.map((n) => n.nim);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tempData.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(tempData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, tempData],
    );

    const handleSearchChange = (event) => {
        const searchText = event.target.value
        setTempData(data?.filter(item => item.nama.toLowerCase().includes(searchText.toLowerCase())))
    }

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
    const handleMenuDisable = () => {
        handleDisableData(false, selectedRow?.nim)
        handleMenuClose()
    }
    const handleMenuEnable = () => {
        handleEnableData(false, selectedRow?.nim)
        handleMenuClose()
    }
    const handleMenuEdit = () => {
        handleEditOpenModal(selectedRow?.nim)
        handleMenuClose()
    }


    return (
        <Box sx={{ width: '100%', margin: 2 }}>
            <EnhancedTableToolbar
                language={language}
                searchChange={handleSearchChange}
                numSelected={selected.length}
                handleDeleteData={handleDeleteData}
                handleDisableData={handleDisableData}
                handleEnableData={handleEnableData}
                selected={selected}
                data={data}
            />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
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
                                    tabIndex={-1}
                                    key={row.nim}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center" padding="none">{page === 0 ? index + 1 : (rowsPerPage*page) + index + 1}</TableCell>
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
                                    <TableCell align="left">{row.jurusan}</TableCell>
                                    <TableCell align="left">{row.jabatan}</TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tempData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Menu
                anchorEl={pointerPosition}
                open={Boolean(pointerPosition)}
                onClose={handleMenuClose}
                keepMounted
            >
                {
                    selectedRow?.status === "Aktif" ? (
                        <MenuItem onClick={handleMenuDisable}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faUserSlash} />
                            </ListItemIcon>
                            <ListItemText primary={language?.disableIt} />
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleMenuEnable}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </ListItemIcon>
                            <ListItemText primary={language?.enableit} />
                        </MenuItem>
                    )
                }

                <MenuItem onClick={handleMenuEdit}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </ListItemIcon>
                    <ListItemText primary={language?.edit} />
                </MenuItem>
                <MenuItem onClick={handleMenuDelete}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faTrash} />
                    </ListItemIcon>
                    <ListItemText primary={language?.delete} />
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default TableMainComponent
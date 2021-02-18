import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper'
import { useRouter } from 'next/router'
import IconButton from '@material-ui/core/IconButton'

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: '#' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'website', numeric: false, disablePadding: false, label: 'Website' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
]

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}))

const UserTable = ({ getPaginationProps = () => ({}) }) => {
  const paginationProps = getPaginationProps()

  const router = useRouter()

  const goToEditUser = useCallback((id) => () => {
    router.push(`/users/${id}`)
  }, [router])
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >

            <EnhancedTableHead
              classes={classes}
              rowCount={paginationProps.count}
            />
            <TableBody>
              {paginationProps.filtered && paginationProps.filtered.map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.website}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={goToEditUser(row.id)} color='primary'>
                      <EditIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          {...paginationProps}
        />
      </Paper>
    </div>
  )
}
export default UserTable

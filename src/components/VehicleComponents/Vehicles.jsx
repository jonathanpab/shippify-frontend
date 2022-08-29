import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import {Link, useParams} from 'react-router-dom';
import {deleteVehicle, getVehicleByDriverId} from "../../Service/api";

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const classes = useStyles();
    const { driver_id } = useParams();

    useEffect(() => {
        getAllVehicles();
    }, []);

    const deleteVehicleData = async (vehicle_id) => {
        await deleteVehicle(vehicle_id);
        getAllVehicles();
    }

    const getAllVehicles = async () => {
        let response = await getVehicleByDriverId(driver_id);
        setVehicles(response.data);
    }

    const formatDate = (creation_date)=>{
        return `${new Date(creation_date).toLocaleDateString()} ${new Date(creation_date).toLocaleTimeString()}`;
    }
    return (
        <>
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>Conductor</TableCell>
                    <TableCell>Placa</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Capacidad</TableCell>
                    <TableCell>Fecha de creación</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vehicles.map((vehicle) => (
                    <TableRow className={classes.row} key={vehicle.id}>
                        <TableCell>{vehicle.driver_id}</TableCell>
                        <TableCell>{vehicle.plate}</TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.type}</TableCell>
                        <TableCell>{vehicle.capacity}</TableCell>
                        <TableCell>{formatDate(vehicle.creation_date)}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/editVehicle/${vehicle.id}`}>Editar Vehículo</Button>
                            <Button color="secondary" variant="contained" onClick={() => deleteVehicleData(vehicle.id)}>Borrar Vehículo</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}

export default Vehicles;
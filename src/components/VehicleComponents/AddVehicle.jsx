import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { addVehicle } from '../../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    driver_id: '',
    plate: '',
    model: '',
    type: '',
    capacity: "",
    creation_date: "",
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const AddVehicle = () => {
    const [vehicle, setVehicle] = useState(initialValue);
    const { driver_id, plate, model, type, capacity, creation_date } = vehicle;
    const classes = useStyles();
    let navigate = useNavigate();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setVehicle({...vehicle, [e.target.name]: e.target.value})
    }

    const addVehicleDetails = async() => {
        await addVehicle(vehicle);
        navigate('./allVehicles');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Agregar Vehículo</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Conductor</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='driver_id' value={driver_id} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Placa</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='plate' value={plate} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Modelo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='model' value={model} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Tipo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='type' value={type} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Capacidad</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='capacity' value={capacity} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Fecha de creación</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='creation_date' value={creation_date} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addVehicleDetails()}>Agregar Vehículo</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddVehicle;
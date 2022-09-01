import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate, useParams} from 'react-router-dom';

import {addVehicle, editVehicle, getVehicle, getVehicleById} from '../../Service/api';

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

const EditVehicle = () => {
    const [vehicle, setVehicle] = useState(initialValue);
    const { driver_id, plate, model, type, capacity, creation_date } = vehicle;
    const { id } = useParams();
    const classes = useStyles();
    let navigate = useNavigate();

    const loadVehicleDetails = async() => {
        const response = await getVehicleById(id);
        setVehicle(response.data[0]);
    }

    const editVehicleDetails = async() => {
        const response = await editVehicle(id, vehicle);
        navigate('/allVehicles');
    }

    const addVehicleDetails = async() => {
        vehicle.creation_date = `${new Date().toLocaleDateString().split("/").reverse().join("-")} ${new Date().toLocaleTimeString()}`;
        await addVehicle(vehicle);
        navigate('/allVehicles');
    }

    const onValueChange = (e) => {
        setVehicle({...vehicle, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        loadVehicleDetails();
    }, []);

    useEffect(()=>{
        if(!id) setVehicle(initialValue);
        else loadVehicleDetails();
    }, [id])

    return (
        <FormGroup className={classes.container}>
            {id ? <Typography variant="h4">Editar Información</Typography> : <Typography variant="h4">Agregar Vehículo</Typography> }
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
            {id && <FormControl>
                <InputLabel htmlFor="my-input">Fecha de creación</InputLabel>
                <Input disabled={true} onChange={(e) => onValueChange(e)} name='creation_date' value={`${new Date(creation_date).toLocaleDateString()} ${new Date(creation_date).toLocaleTimeString()}`} id="my-input" />
            </FormControl>}
            <FormControl>
                {id ? <Button variant="contained" color="primary" onClick={() => editVehicleDetails()}>Editar Vehículo</Button> : <Button variant="contained" color="primary" onClick={() => addVehicleDetails()}>Agregar Vehículo</Button>}
            </FormControl>
        </FormGroup>
    )
}

export default EditVehicle;
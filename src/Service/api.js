import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const getVehicle = async (id) => {
    id = id || '';
    return await axios.get(`${apiUrl}/vehicles/${id}`);
}

export const addVehicle = async (vehicle) => {
    return await axios.post(`${apiUrl}/addVehicles`, vehicle);
}

export const deleteVehicle = async (id) => {
    return await axios.delete(`${apiUrl}/deleteVehicle/${id}`);
}

export const editVehicle = async (id, vehicle) => {
    return await axios.put(`${apiUrl}/editVehicle/${id}`, vehicle)
}
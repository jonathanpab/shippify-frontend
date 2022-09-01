import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Vehicles from "./components/VehicleComponents/Vehicles";
import AddVehicle from "./components/VehicleComponents/AddVehicle";
import EditVehicle from "./components/VehicleComponents/EditVehicle";
import NavBar from "./components/NavigationComponents/NavBar";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route exact path="/allVehicles/:driver_id" element={<Vehicles/>} />
          <Route exact path="/allVehicles" element={<Vehicles/>} />
          <Route exact path="/allVehicles/:limit/:page" element={<Vehicles/>} />
          <Route exact path="/addVehicle" element={<EditVehicle/>} />
          <Route exact path="/editVehicle/:id" element={<EditVehicle/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

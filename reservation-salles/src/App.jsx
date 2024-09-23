import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoAffluences from './assets/LogoAffluences.png'

const App = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2); 
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  const handleCheckAvailability = async () => {
    const selectedDateTime = new Date(`${date}T${time}:00Z`);
    const resourceId = 1337;
    const apiUrl = `http://localhost:8080/resource/${resourceId}/available?datetime=${selectedDateTime.toISOString()}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.available) {
        toast.success('La salle est disponible !');
      } else {
        toast.error('La salle n\'est pas disponible.');
      }
    } catch (error) {
      toast.error('Une erreur s\'est produite lors de la vérification.');
      console.error(error)
    }
  };

  return (
    <div>
      <nav>
        <img className="Logo" src={LogoAffluences} alt="Logo affluences" />
      </nav>
      <div className='availability'>
        <h1>Check if the ressource is available</h1>
        <div className='time'>
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <select value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className='button' onClick={handleCheckAvailability}>Check availability</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;

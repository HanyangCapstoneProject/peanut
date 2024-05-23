// components/BleScanner.js
import { useState } from 'react';

const BleScanner = () => {
  const [devices, setDevices] = useState([]);

  const scanForDevices = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'TH' }],
        optionalServices: ['battery_service'],
      });

      if (device) {
        setDevices((prevDevices) => [...prevDevices, device]);
        console.log('Device found:', device);
      }
    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
    }
  };

  return (
    <div>
      <button onClick={scanForDevices}>센서를 스캔합니다.</button>
      {devices.length > 0 && (
        <ul>
          {devices.map((device, index) => (
            <li key={index}>
              {device.name || 'Unnamed Device'} ({device.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BleScanner;

// pages/device-info.js

import React from 'react';
import { useState } from 'react';

export default function DeviceInfo() {
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [namePrefix, setNamePrefix] = useState('');
  const [allDevices, setAllDevices] = useState(false);
  const [log, setLog] = useState('');

  function isWebBluetoothEnabled() {
    // Implement your logic for checking if Web Bluetooth is enabled
    return true; // For demo purposes, always return true
  }

  function onButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isWebBluetoothEnabled()) {
      clearLog();
      let filters = [];

      let filterService = service;
      if (filterService.startsWith('0x')) {
        filterService = parseInt(filterService);
      }
      if (filterService) {
        filters.push({ services: [filterService] });
      }

      let filterName = name;
      if (filterName) {
        filters.push({ name: filterName });
      }

      let filterNamePrefix = namePrefix;
      if (filterNamePrefix) {
        filters.push({ namePrefix: filterNamePrefix });
      }

      let options = {};
      if (allDevices) {
        options.acceptAllDevices = true;
      } else {
        options.filters = filters;
      }

      setLog('Requesting Bluetooth Device...');
      setLog('with ' + JSON.stringify(options));
      navigator.bluetooth.requestDevice(options)
        .then(device => {
          setLog('> Name:             ' + device.name);
          setLog('> Id:               ' + device.id);
          setLog('> Connected:        ' + device.gatt.connected);
        })
        .catch(error => {
          setLog('Argh! ' + error);
        });
    }
  }

  function clearLog() {
    setLog('');
  }

  return (
    <div>
      <p>This sample illustrates the use of the Web Bluetooth API to retrieve basic
        device information from a nearby Bluetooth Low Energy Device. You may want to
        check out the <a href="device-info-async-await.html">Device Info (Async
        Await)</a> sample.</p>
      <form onSubmit={onButtonClick}>
        <label htmlFor="allDevices">All Devices</label>
        <input id="allDevices" type="checkbox" onChange={(e) => setAllDevices(e.target.checked)} />
        <input id="service" type="text" size={17} placeholder="Bluetooth Service" value={service} onChange={(e) => setService(e.target.value)} />
        <input id="name" type="text" size={17} placeholder="Device Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input id="namePrefix" type="text" size={17} placeholder="Device Name Prefix" value={namePrefix} onChange={(e) => setNamePrefix(e.target.value)} />
        <button type="submit">Get Bluetooth Device Info</button>
      </form>
      <p>{log}</p>
    </div>
  );
}

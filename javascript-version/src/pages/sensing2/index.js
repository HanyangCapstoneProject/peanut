// pages/index.js
import Head from 'next/head';
import BleScanner from '../../components/BleScanner';

export default function Home() {
  return (
    <div>
      <Head>
        <title>BLE Scanner</title>
        <meta name="description" content="BLE Scanner using Web Bluetooth API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to BLE Scanner</h1>
        <BleScanner />
      </main>
    </div>
  );
}

'use client';

// import React, { useState } from 'react';
import path from 'path';

export default function Home() {
  // const [response, setResponse] = useState<string>('');

  const fetchData = async () => {
    console.log(path.join(__dirname, "../../../../../", "certs") )
    // try {
    //   const res = await fetch('/api/mutual-tls');
    //   const data = await res.json();
    //   console.log(data)
    //   // setResponse(data.message || 'No response from server');
    // } catch (error) {
    //   console.error(error);
    //   setResponse('Error fetching data');
    // }
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Mutual TLS Authentication</h1>
      <button onClick={fetchData} style={{ margin: '10px', padding: '10px 20px' }}>
        Fetch Secure Data
      </button>
      {/* <p>Response: {response}</p> */}
    </main>
  );
}

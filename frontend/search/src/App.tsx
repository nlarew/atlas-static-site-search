import React from 'react';
import './App.css';
import Search from './Search';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: "400px"
        }}
      >
        <Typography variant="h3">
          Mango Search
        </Typography>
        <Search

        />
      </div>
    </div>
  );
}

export default App;

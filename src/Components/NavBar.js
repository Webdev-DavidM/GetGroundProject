import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import React, { Component } from 'react';

export default function Navbar() {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            style={{ textAlign: 'center', width: '100%' }}
            variant='h4'>
            GetGround book app
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

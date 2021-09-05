import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites';
import { Button, Menu, MenuItem, Container } from '@material-ui/core';

function App(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Router>
        <Container className="header" maxWidth="md" style={{ backgroundColor: '#ffffff'}}>
          <h1>Giphy Search!</h1>
          <h4>Welcome to Giphy search. Click on the menu bleow to get started!</h4>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Open Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/search">Search</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/favorites">Favorites</Link>
            </MenuItem>
          </Menu>
        </Container>
        <Route path="/" exact>
          <p>Giphy Search!</p>
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
      </Router>
    </div>
  );
}

export default App;


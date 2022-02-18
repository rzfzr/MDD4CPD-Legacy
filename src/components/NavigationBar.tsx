import { Link } from 'react-router-dom';
import { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { AppBar } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';
// import history from '../history';
import React from 'react';

export default function SimpleBottomNavigation() {
    const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    const [value, setValue] = useState(pathname);
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    return (
        <AppBar position="fixed" color="primary" style={{ top: "auto", bottom: 0 }}>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
            >
                location.pathname
                <BottomNavigationAction component={Link} label="Home" to="/mdd4/" icon={<HomeIcon />} />
                <BottomNavigationAction component={Link} label="Models" to="/mdd4/models" icon={<MapIcon />} />
                <BottomNavigationAction component={Link} label="State" to="/mdd4/state" icon={<SwapHorizIcon />} />
                <BottomNavigationAction component={Link} label="Palette" to="/mdd4/palette" icon={<PaletteIcon />} />
                <BottomNavigationAction component={Link} label="Editor" to="/mdd4/editor" icon={<EditIcon />} />
            </BottomNavigation>
        </AppBar>
    );
}
import { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { AppBar } from '@material-ui/core';
import history from '../history';

export default function SimpleBottomNavigation() {
    const [value, setValue] = useState('/');
    let currentPath = history.location.pathname
    if (value !== currentPath)
        setValue(currentPath)
    return (
        <AppBar position="fixed" color="primary" style={{ top: "auto", bottom: 0 }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    history.push(newValue)
                }}
                showLabels
            >
                location.pathname
                <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                <BottomNavigationAction label="Models" value="/models" icon={<MapIcon />} />
                <BottomNavigationAction label="State" value="/state" icon={<SwapHorizIcon />} />
                <BottomNavigationAction label="Editor" value="/editor" icon={<EditIcon />} />
            </BottomNavigation>
        </AppBar>
    );
}
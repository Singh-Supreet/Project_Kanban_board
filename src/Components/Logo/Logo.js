import React from 'react';

const Logo = ({ status }) => {
  const logoReference = {
    "Backlog": 'https://cdn-icons-png.flaticon.com/128/3839/3839944.png',
    "Todo": 'https://cdn-icons-png.flaticon.com/128/3515/3515278.png',
    "In progress": 'https://cdn-icons-png.flaticon.com/128/11478/11478715.png',
    "Done": 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
    "Cancelled": 'https://cdn-icons-png.flaticon.com/128/660/660252.png'
  };

  return <img src={logoReference[status]} className='logo-pic' alt={status} />;
};

export default Logo;

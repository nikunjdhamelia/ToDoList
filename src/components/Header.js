import React from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Header = props => {
  const {title} = props;

  return (
    <Appbar.Header>
      <Appbar.Content title={title} titleStyle={{fontWeight: 'bold'}} />
    </Appbar.Header>
  );
};

export default Header;

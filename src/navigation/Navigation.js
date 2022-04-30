import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Home} from '../screens';
import { Colors } from '../utils/Colors';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.main,
      accent: Colors.black,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.main}}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigation;

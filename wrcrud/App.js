import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './src/views/UserList';
import UserForm from './src/views/UserForm';
import { Button, Icon } from 'react-native-elements';
import {UsersProvider} from './src/context/UsersContext'


const Stack = createStackNavigator();

export default props => {
  return (
    <UsersProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={screenOptions} 
      >
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={({navigation}) => {
            return{
            title: "Lista de usuários",
            headerRight: () => (
              <Button
                onPress= {() => navigation.navigate("UserForm")}
                type="clear"
                icon={<Icon name="add" size={25} color="white" />} 
              />
            )
          }
        }}  
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{
            title: "Formulário de usuários"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UsersProvider>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

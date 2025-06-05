import React, { useContext } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Button, Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default (props) => {

  const {state, dispatch} = useContext(UsersContext)
    
  function confirmUserDeletion(user){
      Alert.alert('Excluir usuário','Deseja excluir usuário?', [
       {
          text: 'Sim',
          onPress(){
            dispatch({
              type: 'deleteUser',
              payload: user
            })
          }
       },
       {
         text: 'Não'
       }
      ])
  }  

  function getActions(user) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </View>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}
      >
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

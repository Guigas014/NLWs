import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
  showGoBack?: boolean;
}


export default function Header({ title, showCancel = true, showGoBack = true }: HeaderProps) {
  const navigation = useNavigation();  

  function handleGoBackToHomepage() {
    navigation.navigate('OrphanagesMap');
  }  


  return (

    <View style={styles.container}>
      { showGoBack
        ? (
          <BorderlessButton onPress={navigation.goBack}>
            <Feather name="arrow-left" size={24} color="#15b5d6" />
          </BorderlessButton>
        )
        : (
          <View />
        )
      }
      <Text style={styles.title}>{title}</Text>
      
      { showCancel
        ? (
          <BorderlessButton onPress={handleGoBackToHomepage}>
            <Feather name="x" size={24} color="#ff669d" />
          </BorderlessButton>  
        )
        : (
          <View />  
        ) 
      }

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 74,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },

})


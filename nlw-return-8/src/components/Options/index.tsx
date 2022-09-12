import React from 'react'; 
import { View } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { styles } from './styles'; 
 


export function Options() { 

	 return ( 

    <View style={styles.container}>
      <Options />
      <Copyright />
    </View>

	 ); 

}

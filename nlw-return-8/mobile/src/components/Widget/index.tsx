import React from 'react'; 
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';

import { theme } from '../../theme'
import { styles } from './styles'; 
 


export function Widget() { 

	 return ( 
    <>
      <TouchableOpacity 
        style={styles.button}
      >
        <ChatTeardropDots 
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      

      </TouchableOpacity>
    </>
	 ); 

}

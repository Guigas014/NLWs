import React, { useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';

import { theme } from '../../theme';
import { styles } from './styles'; 
 


export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null); 

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }  


  return ( 
    <>
      <TouchableOpacity
        onPress={handleOpen}
        style={styles.button}
      >
      
      <Image 
        source={require('../../assets/icons/chat-teardrop-dots.png')} 
        style={{
          width: 24,
          height: 24,
          backgroundColor: "transparent", 
        }}
      />

      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
      
        <Options />

      </BottomSheet>
    </>
  ); 
 
}

export default gestureHandlerRootHOC(Widget);


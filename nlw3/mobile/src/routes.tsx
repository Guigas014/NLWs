import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();


export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: true, cardStyle: {backgroundColor: '#f2f3f5'} }}>
        
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap}
          options={{
            header: () => <Header title="Happy" showCancel={false} showGoBack={false} />
          }} 
        />

        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails}
          options={{
            header: () => <Header title="Orfanato" showCancel={false} />
          }} 
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition} 
          options={{
            header: () => <Header title="Selecione no mapa" />
          }} 
        />

        <Screen 
          name="OrphanageData" 
          component={OrphanageData} 
          options={{
            header: () => <Header title="Informe os dados" />
          }} 
        />
      
      </Navigator>
    </NavigationContainer>
  );
}


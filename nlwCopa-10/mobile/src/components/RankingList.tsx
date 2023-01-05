import { useState, useEffect } from 'react';
import { Box, useToast, FlatList, VStack, HStack, Avatar, Heading, Text } from 'native-base';

import { api } from '../services/api';

import { Loading } from './Loading';
import { Ranking } from './Ranking';
import { EmptyRakingList } from './EmptyRakingList';
import { PoolCardProps } from './PoolCard';
import { ParticipantProps, Participants } from './Participants';


interface Props {
  pool: PoolCardProps;
}

export function RankingList({ pool }: Props) {
  var position = 1;

  return (
    <FlatList
      data={pool.participants}
      keyExtractor={item => item.id}  
      renderItem={({ item }) => (
        <Ranking 
          participant={item} 
          ownerId={pool.ownerId} 
          position={position++}
        />
      )}
      _contentContainerStyle={{ pb: 20 }}
      ListEmptyComponent={() => <EmptyRakingList />}
    />


  ); 
}


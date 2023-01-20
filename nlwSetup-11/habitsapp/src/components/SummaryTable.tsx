import { View, Text, ScrollView } from 'react-native';

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { HabitDay, DAY_SIZE } from './HabitDay';


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 8;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;


export function SummaryTable() {
  return (
    <>
      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDay, index) => {
            return (
              <Text 
                key={index}
                className="text-zinc-400 text-xl font-bold text-center mx-1"
                style={{ width: DAY_SIZE }}
              >
                {weekDay}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
      <View className="flex-row flex-wrap">
        {
          datesFromYearStart.map(date => {
            return (
              <HabitDay 
                key={date.toISOString()}
              />
            )
          })
        }

        {
          amountOfDaysToFill > 0 && Array
            .from({ length: amountOfDaysToFill })
            .map((_, index) => (
              <View 
                key={index}
                className="
                  bg-zinc-900 
                  rounded-lg 
                  border-2 
                  m-1 
                  border-zinc-800 
                  opacity-40" 
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))
        }
      </View>
      </ScrollView>
    </>
  ) 
}

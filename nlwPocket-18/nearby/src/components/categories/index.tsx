import { FlatList } from "react-native"

import { styles } from "./styles"
import { Category } from "../category"

export type CategoriesProps = {
  id: string
  name: string
}[] //indica que é uma lista

type Props = {
  data: CategoriesProps
  selected: string
  onSelect: (id: string) => void
}

export function Categories({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  )
}

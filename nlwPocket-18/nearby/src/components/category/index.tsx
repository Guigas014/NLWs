import { Text, Pressable, PressableProps } from "react-native"
import { styles } from "./styles"

import { categoriesIcons } from "@/utils/categories-icons"
import { colors } from "@/styles/colors"

type CategoryProps = PressableProps & {
  iconId: string
  isSelected?: boolean
  name: string
}

export function Category({
  name,
  iconId,
  isSelected = false,
  ...rest
}: CategoryProps) {
  const Icon = categoriesIcons[iconId]

  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />

      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  )
}

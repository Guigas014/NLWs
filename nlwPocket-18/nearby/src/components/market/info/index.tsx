import { View, Text } from "react-native"
import { IconProps } from "@tabler/icons-react-native"

import { styles } from "./styles"
import { colors } from "@/styles/theme"

type Props = {
  description: string
  icon: React.ComponentType<IconProps>
}

//O Icon está renomeando a propriedade icon. Para que possa ser usada como componente.
export function Info({ description, icon: Icon }: Props) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}

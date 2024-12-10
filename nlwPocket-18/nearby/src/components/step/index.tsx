import { View, Image, Text } from "react-native"
import { IconProps } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { styles } from "./styles"

type stepProps = {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}

export function Step({ title, description, icon: Icon }: stepProps) {
  return (
    <View style={styles.container}>
      {Icon && <Icon size={32} color={colors.red.base} />}

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

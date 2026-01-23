import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        {/* HEADER */}
        <View style={homeStyles.header}>
          <View style={homeStyles.titleContainer}>
            <Text style={homeStyles.title}>Home</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

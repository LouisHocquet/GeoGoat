import { createProfileStyles } from "@/assets/styles/profile.styles";
import useTheme from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const profileStyles = createProfileStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={profileStyles.section}
    >
      <Text style={profileStyles.sectionTitle}>Preferences</Text>

      {/* DARK MODE */}
      <View style={profileStyles.settingItem}>
        <View style={profileStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={profileStyles.settingIcon}
          >
            <Ionicons name="moon" color={"#fff"} size={18} />
          </LinearGradient>
          <Text style={profileStyles.settingText}>Mode sombre</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.primary }}
          ios_backgroundColor={colors.border}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;

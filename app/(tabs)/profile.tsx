import { createProfileStyles } from "@/assets/styles/profile.styles";
import Preferences from "@/components/Preferences";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const profileStyles = createProfileStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={profileStyles.container}
    >
      <SafeAreaView style={profileStyles.safeArea}>
        {/* HEADER */}
        <View style={profileStyles.header}>
          <View style={profileStyles.titleContainer}>
            {/* <LinearGradient
              colors={colors.gradients.primary}
              style={profileStyles.iconContainer}
            >
              <Ionicons name="person" size={28} color="#ffffff" />
            </LinearGradient> */}
            <Text style={profileStyles.title}>Profile</Text>
          </View>
        </View>
        <Preferences />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;

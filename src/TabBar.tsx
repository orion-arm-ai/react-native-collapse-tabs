import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TabBarProps } from "./types/types";

export const DefaultTabBar: React.FC<TabBarProps> = ({
  tabNames,
  indexDecimal,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabNames.map((name, i) => (
        <TabBarItem
          key={name}
          name={name}
          index={i}
          indexDecimal={indexDecimal}
          onPress={() => onTabPress(name)}
        />
      ))}
      <Indicator count={tabNames.length} indexDecimal={indexDecimal} />
    </View>
  );
};

const TabBarItem: React.FC<{
  name: string;
  index: number;
  indexDecimal: Animated.SharedValue<number>;
  onPress: () => void;
}> = ({ name, index, indexDecimal, onPress }) => {
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      indexDecimal.value,
      [index - 1, index, index + 1],
      [0.6, 1, 0.6],
      "clamp"
    ),
  }));
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Animated.Text style={[styles.label, labelStyle]}>{name}</Animated.Text>
    </Pressable>
  );
};

const Indicator: React.FC<{
  count: number;
  indexDecimal: Animated.SharedValue<number>;
}> = ({ count, indexDecimal }) => {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: (indexDecimal.value * 100) / count + "%" } as any,
    ],
    width: `${100 / count}%`,
  }));
  return <Animated.View style={[styles.indicator, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: "#2D8CFF",
  },
});

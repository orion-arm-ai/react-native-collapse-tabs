import React from "react";
import { View, StyleSheet } from "react-native";
import { TabProps } from "./types/types";

/**
 * Container for a single tab's content. Should be a direct child of
 * <CollapseTabs>. Place a wrapped <FlatList> or <ScrollView> inside.
 */
export const Tab = <T extends string>({ children }: TabProps<T>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

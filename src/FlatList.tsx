import React, { useEffect } from "react";
import { FlatList as RNFlatList, FlatListProps } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useTabsContext } from "./hooks";

type Props<T> = FlatListProps<T> & { name: string };

export function FlatList<T>({ name, contentContainerStyle, ...rest }: Props<T>) {
  const {
    headerHeight,
    tabBarHeight,
    scrollY,
    focusedTab,
    setRef,
  } = useTabsContext();

  const ref = useAnimatedRef<RNFlatList<T>>();

  useEffect(() => {
    setRef(name, ref);
  }, [name, ref, setRef]);

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (focusedTab.value !== name) return;
      const map = { ...scrollY.value };
      map[name] = event.contentOffset.y;
      scrollY.value = map;
    },
  });

  return (
    <Animated.FlatList
      {...(rest as FlatListProps<T>)}
      ref={ref as any}
      onScroll={handler}
      scrollEventThrottle={16}
      contentContainerStyle={[
        { paddingTop: headerHeight + tabBarHeight },
        contentContainerStyle,
      ]}
    />
  );
}

import React, { useEffect } from "react";
import { ScrollViewProps, ScrollView as RNScrollView } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useTabsContext } from "./hooks";

type Props = ScrollViewProps & { name: string; children?: React.ReactNode };

export function ScrollView({
  name,
  contentContainerStyle,
  children,
  ...rest
}: Props) {
  const {
    headerHeight,
    tabBarHeight,
    scrollY,
    focusedTab,
    setRef,
  } = useTabsContext();

  const ref = useAnimatedRef<Animated.ScrollView>();

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
    <Animated.ScrollView
      {...rest}
      ref={ref}
      onScroll={handler}
      scrollEventThrottle={16}
      contentContainerStyle={[
        { paddingTop: headerHeight + tabBarHeight },
        contentContainerStyle,
      ]}
    >
      {children}
    </Animated.ScrollView>
  );
}

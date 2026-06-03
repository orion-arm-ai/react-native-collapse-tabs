import React, { useEffect } from "react";
import { FlatList as RNFlatList, FlatListProps } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useTabsContext } from "./hooks";

type Props<T> = FlatListProps<T> & { name: string };

export function FlatList<T>({
  name,
  contentContainerStyle,
  onScroll: userOnScroll,
  ...rest
}: Props<T>) {
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

  const handler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        if (focusedTab.value === name) {
          const map = { ...scrollY.value };
          map[name] = event.contentOffset.y;
          scrollY.value = map;
        }
        if (userOnScroll) {
          if ((userOnScroll as any).worklet === true) {
            (userOnScroll as any)(event);
          } else {
            runOnJS(userOnScroll as any)(event);
          }
        }
      },
    },
    [name, userOnScroll],
  );

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

import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView, {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from "react-native-pager-view";
import Animated, {
  AnimatedRef,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useEvent,
  useHandler,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Context } from "./context";
import { DefaultTabBar } from "./TabBar";
import {
  CollapseTabsProps,
  ContainerRef,
  ContextType,
  RefComponent,
  TabName,
  TabProps,
  TabReactElement,
} from "./types/types";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const CollapseTabs: React.FC<CollapseTabsProps> = ({
  children,
  initialTabName,
  headerHeight,
  tabBarHeight,
  minHeaderHeight = 0,
  renderHeader,
  renderTabBar,
  containerStyle,
  headerContainerStyle,
  pagerProps,
  onIndexChange,
}) => {
  const tabs = useMemo(
    () =>
      React.Children.toArray(children).filter((c): c is TabReactElement =>
        React.isValidElement(c),
      ),
    [children],
  );

  const tabNames = useMemo(
    () => tabs.map((t) => (t.props as TabProps).name),
    [tabs],
  );

  const initialIndex = Math.max(
    0,
    initialTabName ? tabNames.indexOf(initialTabName) : 0,
  );

  const headerScrollDistance = headerHeight - minHeaderHeight;

  const index = useSharedValue(initialIndex);
  const indexDecimal = useSharedValue(initialIndex);
  const focusedTab = useSharedValue<TabName>(tabNames[initialIndex] ?? "");

  const initialScrollY = useMemo(() => {
    const m: Record<string, number> = {};
    tabNames.forEach((n) => (m[n] = 0));
    return m;
  }, [tabNames]);
  const scrollY = useSharedValue<Record<TabName, number>>(initialScrollY);

  const headerTranslateY = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const tab = focusedTab.value;
      const y = scrollY.value[tab] ?? 0;
      return {
        tab,
        translateY: -Math.min(Math.max(y, 0), headerScrollDistance),
      };
    },
    (next, prev) => {
      if (prev && prev.tab !== next.tab) {
        headerTranslateY.value = withTiming(next.translateY, { duration: 250 });
      } else {
        headerTranslateY.value = next.translateY;
      }
    },
    [headerScrollDistance],
  );

  const refMap = useRef<Record<TabName, AnimatedRef<RefComponent>>>({}).current;

  const setRef = useCallback(
    <R extends RefComponent>(key: TabName, ref: AnimatedRef<R>) => {
      refMap[key] = ref as unknown as AnimatedRef<RefComponent>;
      return ref;
    },
    [refMap],
  );

  const containerRef = useRef<ContainerRef>(null);

  const onTabPress = useCallback(
    (name: TabName) => {
      const i = tabNames.indexOf(name);
      if (i < 0) return;
      containerRef.current?.setPage(i);
    },
    [tabNames],
  );

  const [renderIndex, setRenderIndex] = useState(initialIndex);

  const { doDependenciesDiffer } = useHandler({});
  const pageScrollHandler = useEvent<PagerViewOnPageScrollEventData>(
    (e) => {
      "worklet";
      indexDecimal.value = e.position + e.offset;
    },
    ["onPageScroll"],
    doDependenciesDiffer,
  );

  const onPageSelected = useCallback(
    (e: { nativeEvent: PagerViewOnPageSelectedEventData }) => {
      const i = e.nativeEvent.position;
      index.value = i;
      focusedTab.value = tabNames[i] ?? "";
      setRenderIndex(i);
      onIndexChange?.(i);
    },
    [tabNames, index, focusedTab, onIndexChange],
  );

  const headerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const ctxValue: ContextType = {
    headerHeight,
    tabBarHeight,
    minHeaderHeight,
    headerScrollDistance,
    tabNames,
    index,
    indexDecimal,
    focusedTab,
    scrollY,
    headerTranslateY,
    setRef,
    refMap,
    containerRef,
  };

  const headerProps = {
    tabNames,
    focusedTab,
    index,
    indexDecimal,
    onTabPress,
  };

  return (
    <Context.Provider value={ctxValue}>
      <View style={[styles.container, containerStyle]}>
        <AnimatedPagerView
          ref={containerRef as any}
          style={StyleSheet.absoluteFill}
          initialPage={initialIndex}
          onPageScroll={pageScrollHandler as any}
          onPageSelected={onPageSelected}
          {...pagerProps}
        >
          {tabs.map((tab, i) => (
            <View key={tab.props.name} style={styles.page} collapsable={false}>
              {tab}
            </View>
          ))}
        </AnimatedPagerView>

        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.headerContainer,
            { height: headerHeight + tabBarHeight },
            headerContainerStyle,
            headerAnimStyle,
          ]}
        >
          <View pointerEvents="box-none" style={{ height: headerHeight }}>
            {renderHeader?.(headerProps)}
          </View>
          <View style={{ height: tabBarHeight }}>
            {renderTabBar ? (
              renderTabBar(headerProps)
            ) : (
              <DefaultTabBar {...headerProps} />
            )}
          </View>
        </Animated.View>
      </View>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  page: { flex: 1 },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
});

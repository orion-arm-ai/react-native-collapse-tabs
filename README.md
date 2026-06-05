# @orionarm/react-native-collapse-tabs

[![npm version](https://img.shields.io/npm/v/@orionarm/react-native-collapse-tabs.svg?style=flat-square)](https://www.npmjs.com/package/@orionarm/react-native-collapse-tabs)
[![npm downloads](https://img.shields.io/npm/dm/@orionarm/react-native-collapse-tabs.svg?style=flat-square)](https://www.npmjs.com/package/@orionarm/react-native-collapse-tabs)
[![license](https://img.shields.io/npm/l/@orionarm/react-native-collapse-tabs.svg?style=flat-square)](./LICENSE)
[![platforms](https://img.shields.io/badge/platforms-iOS%20%7C%20Android-blue?style=flat-square)]()
[![types](https://img.shields.io/npm/types/@orionarm/react-native-collapse-tabs.svg?style=flat-square)](https://www.npmjs.com/package/@orionarm/react-native-collapse-tabs)

> A high-performance **React Native collapsible tabs** component with **sticky / animated header**, **swipeable pages**, and **per-tab scroll state**. Built on [`react-native-pager-view`](https://github.com/callstack/react-native-pager-view) and [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated).

## Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/orion-arm-ai/react-native-collapse-tabs/main/assets/collapse-tabs.gif" alt="collapse-tabs demo" width="320" />
</p>

---

## Features

- 📜 **Collapsible header** — the header smoothly collapses while the inner list is scrolled.
- 🗂 **Swipeable tabs** — horizontal paging powered by `react-native-pager-view`.
- 🎚 **Per-tab scroll state** — each tab keeps its own scroll position.
- 🪄 **Animated tab switching** — header smoothly tweens between tabs (no sudden jumps).
- 🛡 **Overscroll-safe** — pull-to-refresh / bounce area won't push the header off screen.
- 🎨 **Custom header & tab bar** — bring your own UI, or use the built-in `DefaultTabBar`.
- 🪝 **`onScroll` passthrough** — wrapped lists still forward your own scroll handler (worklet or JS).
- ⚡ **Reanimated 3 worklets** — animations run on the UI thread for 60fps.
- 🧩 **Drop-in scrollables** — wrapped `FlatList` / `ScrollView` handle the plumbing for you.
- 📐 **Dynamic header height** — omit `headerHeight` and the header is auto-measured via `onLayout`.

---

## When to use

Use `@orionarm/react-native-collapse-tabs` when you need a **Twitter / Instagram / YouTube profile style screen** in React Native — a large header that collapses as you scroll, sticky tabs underneath, swipeable pages, and per-tab scroll memory.

Typical use cases:

- **User / profile screens** with a hero header and `Posts / Likes / Media` tabs
- **Product detail pages** with tabbed sections (Description / Reviews / Q&A)
- **Restaurant / store pages** with collapsing cover image and category tabs
- **Music / video apps** with an artist header and `Songs / Albums / Playlists` tabs
- Any screen that needs a **collapsing header + sticky tab bar + horizontal swipe**

## Comparison with similar libraries

| Library                                       | Collapsible header | Swipeable tabs | Per-tab scroll | Reanimated v3 worklets | Bundle size |
| --------------------------------------------- | ------------------ | -------------- | -------------- | ---------------------- | ----------- |
| **@orionarm/react-native-collapse-tabs**      | ✅                 | ✅             | ✅             | ✅                     | ~30 KB      |
| `react-native-collapsible-tab-view`           | ✅                 | ✅             | ✅             | ✅                     | larger      |
| `react-native-scrollable-tab-view` _(legacy)_ | partial            | ✅             | ❌             | ❌                     | small       |
| `react-native-tab-view`                       | ❌                 | ✅             | ❌             | partial                | medium      |
| `react-native-sticky-parallax-header`         | ✅                 | ❌             | ❌             | partial                | medium      |

Compared to `react-native-collapsible-tab-view`, this library aims for a **smaller API surface** and uses `react-native-pager-view` directly for native paging — fewer abstractions, easier to drop in, and easier to customize.

---

## Requirements

| Peer dependency                | Version    |
| ------------------------------ | ---------- |
| `react`                        | `>=16.8.0` |
| `react-native`                 | `>=0.60.0` |
| `react-native-gesture-handler` | `>=2.0.0`  |
| `react-native-pager-view`      | `>=6.0.0`  |
| `react-native-reanimated`      | `>=3.0.0`  |

Make sure Reanimated is set up correctly (Babel plugin + `react-native-reanimated/plugin` at the **end** of your `babel.config.js` plugins array).

---

## Installation

```bash
# npm
npm install @orionarm/react-native-collapse-tabs

# yarn
yarn add @orionarm/react-native-collapse-tabs

# pnpm
pnpm add @orionarm/react-native-collapse-tabs
```

Then install the peer dependencies if you haven't already:

```bash
npm install react-native-pager-view react-native-reanimated react-native-gesture-handler
```

For iOS, don't forget to install pods:

```bash
cd ios && pod install
```

---

## Quick Start

```tsx
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  CollapseTabs,
  Tab,
  FlatList,
} from "@orionarm/react-native-collapse-tabs";

const HEADER_HEIGHT = 200;
const TAB_BAR_HEIGHT = 44;

export default function Example() {
  return (
    <CollapseTabs
      headerHeight={HEADER_HEIGHT}
      tabBarHeight={TAB_BAR_HEIGHT}
      renderHeader={() => (
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
      )}
    >
      <Tab name="Posts">
        <FlatList
          name="Posts"
          data={Array.from({ length: 30 }).map((_, i) => `Post ${i}`)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </Tab>

      <Tab name="Likes">
        <FlatList
          name="Likes"
          data={Array.from({ length: 30 }).map((_, i) => `Like ${i}`)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </Tab>
    </CollapseTabs>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#2D8CFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "600" },
  row: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
});
```

> ⚠️ Important: the `name` prop of `<Tab>` and the `name` prop of the wrapped `<FlatList>` / `<ScrollView>` **must match** — that's how each tab's scroll position is tracked.

---

## API

### `<CollapseTabs />`

The root container.

| Prop                   | Type                                                    | Required | Description                                                                            |
| ---------------------- | ------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `headerHeight`         | `number`                                                |          | Header height. If omitted, it's auto-measured via `onLayout`. Pass explicitly for a stable first paint. |
| `tabBarHeight`         | `number`                                                | ✅       | Fixed height of the tab bar.                                                           |
| `children`             | `TabReactElement \| TabReactElement[]`                  | ✅       | One or more `<Tab>` children.                                                          |
| `initialTabName`       | `string`                                                |          | Tab to focus on mount. Defaults to the first child.                                    |
| `minHeaderHeight`      | `number`                                                |          | Minimum visible header height once collapsed. Default `0`.                             |
| `renderHeader`         | `(props: HeaderProps) => ReactElement \| null`          |          | Render function for the header content.                                                |
| `renderTabBar`         | `(props: TabBarProps) => ReactElement \| null`          |          | Render function for a custom tab bar. Falls back to `<DefaultTabBar>` if not provided. |
| `containerStyle`       | `StyleProp<ViewStyle>`                                  |          | Style for the outer container.                                                         |
| `headerContainerStyle` | `StyleProp<ViewStyle>`                                  |          | Style for the absolutely-positioned header wrapper.                                    |
| `pagerProps`           | `Omit<PagerViewProps, "onPageScroll" \| "initialPage">` |          | Extra props forwarded to `PagerView`.                                                  |
| `onIndexChange`        | `(index: number) => void`                               |          | Fired after the focused tab changes.                                                   |

### `<Tab />`

Wraps a single tab's content. Should be a direct child of `<CollapseTabs>`.

| Prop       | Type              | Required | Description                                                            |
| ---------- | ----------------- | -------- | ---------------------------------------------------------------------- |
| `name`     | `string`          | ✅       | Unique identifier — must match the inner list's `name`.                |
| `label`    | `string`          |          | Optional display label (currently used by `DefaultTabBar` via `name`). |
| `children` | `React.ReactNode` | ✅       | Tab content — usually a wrapped `<FlatList>` or `<ScrollView>`.        |

### `<FlatList />` and `<ScrollView />`

Drop-in replacements for the standard components, pre-wired to the collapse-tabs scroll system.

| Prop       | Type                                    | Required | Description                                                                         |
| ---------- | --------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| `name`     | `string`                                | ✅       | Must match the parent `<Tab name="..." />`.                                         |
| `onScroll` | `(event) => void` or Reanimated worklet |          | Forwarded after the internal handler runs. Works with both JS and worklet handlers. |
| ...        | —                                       |          | All other standard `FlatList` / `ScrollView` props.                                 |

> They automatically apply `paddingTop: headerHeight + tabBarHeight` to the content so your first item starts below the header.

```tsx
// Custom onScroll still works — gets called after the header math runs.
<FlatList
  name="Posts"
  data={data}
  renderItem={renderItem}
  onScroll={(e) => {
    console.log("user scroll y =", e.nativeEvent.contentOffset.y);
  }}
/>
```

### `<DefaultTabBar />`

A minimal built-in tab bar with a sliding underline indicator. Pass any custom UI through `renderTabBar` if you need something different.

### `useTabsContext()`

Hook for advanced use cases (e.g. building a fully custom header/tab bar that needs access to the shared scroll state).

```tsx
const {
  headerHeight,
  tabBarHeight,
  headerScrollDistance,
  tabNames,
  index, // SharedValue<number>
  indexDecimal, // SharedValue<number>
  focusedTab, // SharedValue<string>
  scrollY, // SharedValue<Record<string, number>>
  headerTranslateY, // SharedValue<number>
  containerRef,
} = useTabsContext();
```

---

## Customization

### Custom tab bar

```tsx
<CollapseTabs
  headerHeight={200}
  tabBarHeight={44}
  renderTabBar={({ tabNames, indexDecimal, onTabPress }) => (
    <MyFancyTabBar
      tabs={tabNames}
      indexDecimal={indexDecimal}
      onPress={onTabPress}
    />
  )}
>
  {/* ... */}
</CollapseTabs>
```

### Animated header

`renderHeader` receives the same `HeaderProps` so you can animate things based on `indexDecimal` or read `headerTranslateY` from `useTabsContext()` inside a child component.

---

## Types

All public types are exported from the package root:

```ts
import type {
  CollapseTabsProps,
  TabProps,
  TabBarProps,
  HeaderProps,
  TabName,
} from "@orionarm/react-native-collapse-tabs";
```

---

## FAQ

### How is this different from `react-native-collapsible-tab-view`?

Both solve the same problem. `@orionarm/react-native-collapse-tabs` has a smaller surface area, uses `react-native-pager-view` directly (instead of `react-native-tab-view`), and exposes the underlying Reanimated `SharedValue`s through `useTabsContext()` so you can build fully custom headers/tab bars without forking.

### Does it work with Expo?

Yes. It works with **Expo SDK 49+** (any version that supports `react-native-reanimated` v3 and `react-native-pager-view` 6+). Run `npx expo install react-native-reanimated react-native-pager-view react-native-gesture-handler` and you're set.

### Does it support iOS and Android?

Yes — both platforms are first-class. All animations run on the UI thread via Reanimated worklets, so performance is identical on both.

### Does it support pull-to-refresh?

Yes. Pass `refreshControl` to the wrapped `<FlatList>` just like a normal RN list. The library handles overscroll so the header won't fly off-screen during the pull gesture.

### Can I use a custom tab bar / animated header?

Absolutely. Pass `renderTabBar` and `renderHeader` props, or read the shared scroll state via `useTabsContext()` to drive your own animations.

### Does it support dynamic header height?

Yes. `headerHeight` is optional — when omitted, the header is measured via `onLayout` and the layout updates automatically. Pass `headerHeight` explicitly when you need a stable first paint (otherwise list content briefly mounts with `paddingTop: tabBarHeight` before the first layout pass).

```tsx
<CollapseTabs
  tabBarHeight={44}
  renderHeader={() => <MyDynamicHeader />}
>
  {/* ... */}
</CollapseTabs>
```

### How do I keep each tab's scroll position independent?

It's automatic. Just make sure the `name` prop on `<Tab>` matches the `name` prop on the inner `<FlatList>` / `<ScrollView>`.

### Why Reanimated v3?

Reanimated v3 worklets let scroll-driven animations run entirely on the UI thread, which is required for jank-free 60fps header collapse on lower-end Android devices.

---

## Keywords

`react-native collapsible tabs` · `react-native sticky header tabs` · `react-native parallax header` · `react-native tab view with collapsing header` · `react-native scrollable tab bar` · `react-native pager view tabs` · `react-native animated tabs` · `react-native profile screen` · `instagram profile tabs react-native` · `twitter profile header react-native`

---

## Roadmap

- [x] Dynamic header height
- [ ] SectionList / horizontal-list support
- [ ] Snap-to-collapse behavior
- [ ] Example app

---

## License

ISC © yanan_orionarm

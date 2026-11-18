import { useNavigation } from 'expo-router';

/**
 * Replace the whole navigation history with a single screen, so "back"
 * can't return to where you came from (e.g. after signing in or out).
 *
 * Expo Router needs a complete state for a reset (key, routeNames,
 * routeKeySeq…), so we copy the current one and swap in the new route list;
 * the route key is minted by the router.
 */
export function useResetTo() {
  const navigation = useNavigation();

  return function resetTo(routeName: string) {
    const state = navigation.getState();
    if (!state) return false;
    navigation.reset({
      ...state,
      index: 0,
      routes: [{ name: routeName }],
      stale: false,
    } as unknown as Parameters<typeof navigation.reset>[0]);
    return true;
  };
}

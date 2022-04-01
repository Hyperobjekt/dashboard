import { useMemo } from "react";
import { useDidMount } from "rooks";
import { useDashboardState } from "@hyperobjekt/react-dashboard";

/**
 * Returns state and setter that determines the active data view ("map" or "scorecard")
 * @returns {[string, (string) => void]}
 */
export default function useActiveView() {
  const activeView = useDashboardState("activeView");
  const setState = useDashboardState("set");
  const setActiveView = (view) => setState({ activeView: view });
  useDidMount(() => {
    if (!activeView) setActiveView("map");
  });
  return useMemo(() => {
    return [activeView || "map", setActiveView];
  }, [activeView, setActiveView]);
}

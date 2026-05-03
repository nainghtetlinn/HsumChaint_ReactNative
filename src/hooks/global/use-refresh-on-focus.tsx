import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export function useRefreshOnFocus() {
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // refetch all stale active queries
      queryClient.refetchQueries({
        queryKey: ["posts"],
        stale: true,
        type: "active",
      });
    }, [queryClient]),
  );
}

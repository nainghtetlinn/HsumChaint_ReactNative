import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";

onlineManager.setEventListener((setOnline) => {
  let initialized = false;

  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialized = true;
    setOnline(!!state.isConnected);
  });

  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialized) {
        setOnline(!!state.isConnected);
      }
    })
    .catch(() => {
      // getNetworkStateAsync can reject on some platforms/SDK versions
    });

  return () => {
    eventSubscription.remove();
  };
});

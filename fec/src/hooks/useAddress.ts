import { useCallback, useEffect, useState } from "react";
import useStore from "../store/useStore";

const useAddress = () => {
  const { dispatch } = useStore();
  const [addresses, setAddresses] = useState<
    Record<
      string,
      Record<
        string,
        {
          maqh: string;
          name: string;
          wards: Record<string, { xaid: string; name: string }>;
        }
      >
    >
  >({});

  const getAddress = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch("/json/__addresses.json", { method: "GET", signal });
        const fetchedAddresses = await res.json();
        setAddresses(fetchedAddresses);
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    getAddress(controller.signal);

    return () => controller.abort();
  }, [getAddress]);

  return addresses;
};

export default useAddress;

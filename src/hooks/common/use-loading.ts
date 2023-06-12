import useBoolean from "./use-boolean";

export default function useLoading(initValue = false) {
  const {
    bool: loading,
    setTrue: startLoading,
    setFalse: endLoaing,
  } = useBoolean(initValue);

  return {
    loading,
    startLoading,
    endLoaing,
  };
}

import { renderHook } from "@testing-library/react-hooks";
import useFormattedDate from "./useFormattedDate";

describe("useFormattedDate", () => {
  test("converts the date from the ISO 8601 format №1", () => {
    const { result } = renderHook(() =>
      useFormattedDate("2024-07-24T16:51:22.054232Z")
    );
    expect(result.current).toBe("24 июля 22:51");
  });

  test("converts the date from the ISO 8601 format №2", () => {
    const { result } = renderHook(() =>
      useFormattedDate("2024-04-12T12:32:22.024795Z")
    );
    expect(result.current).toBe("12 апреля 18:32");
  });
});

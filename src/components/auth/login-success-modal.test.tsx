jest.mock("@gorhom/bottom-sheet", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    BottomSheetModal: React.forwardRef(
      (props: { children: React.ReactNode }, _ref: React.ForwardedRef<unknown>) => {
        return <View>{props.children}</View>;
      },
    ),
    BottomSheetView: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock("../ui/image", () => {
  const { Text } = require("react-native");
  return {
    Image: () => <Text>mock-image</Text>,
  };
});

import { fireEvent, render, screen } from "@/lib/test-utils";
import { LoginSuccessModal } from "./login-success-modal";

describe("LoginSuccessModal", () => {
  it("calls goHome when the CTA is pressed", () => {
    const close = jest.fn();
    const goHome = jest.fn();

    render(<LoginSuccessModal show close={close} goHome={goHome} />);

    fireEvent.press(screen.getByText("Go to home"));

    expect(goHome).toHaveBeenCalledTimes(1);
  });
});

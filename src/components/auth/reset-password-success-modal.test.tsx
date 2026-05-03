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
import { ResetPasswordSuccessModal } from "./reset-password-success-modal";

describe("ResetPasswordSuccessModal", () => {
  it("calls close when the CTA is pressed", () => {
    const close = jest.fn();

    render(<ResetPasswordSuccessModal show close={close} />);

    fireEvent.press(screen.getByText("Login Again"));

    expect(close).toHaveBeenCalledTimes(1);
  });
});

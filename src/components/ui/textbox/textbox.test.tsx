import { Text } from "react-native";
import { fireEvent, render, screen } from "@/lib/test-utils";
import { Textbox } from ".";

describe("Textbox", () => {
  it("should render input with provided props", () => {
    render(<Textbox testID="textbox-input" placeholder="Email" accessibilityLabel="email" />);

    const input = screen.getByTestId("textbox-input");
    expect(input).toBeOnTheScreen();
    expect(input.props.placeholder).toBe("Email");
    expect(input.props.placeholderTextColor).toBe("#939393");
  });

  it("should render left and right icons and handle presses", () => {
    const onLeftPress = jest.fn();
    const onRightPress = jest.fn();

    render(
      <Textbox
        leftIcon={<Text testID="left-icon">◎</Text>}
        leftIconButtonProps={{ testID: "left-btn", onPress: onLeftPress }}
        rightIcon={<Text testID="right-icon">◎</Text>}
        rightIconButtonProps={{ testID: "right-btn", onPress: onRightPress }}
      />,
    );

    expect(screen.getByTestId("left-icon")).toBeOnTheScreen();
    expect(screen.getByTestId("right-icon")).toBeOnTheScreen();

    fireEvent(screen.getByTestId("left-btn"), "press");
    fireEvent(screen.getByTestId("right-btn"), "press");

    expect(onLeftPress).toHaveBeenCalledTimes(1);
    expect(onRightPress).toHaveBeenCalledTimes(1);
  });

  it("should apply icon size based on size prop", () => {
    const Icon = ({ color, size, testID }: { color?: string; size?: number; testID: string }) => (
      <Text testID={testID}>{`${color}-${size}`}</Text>
    );

    render(<Textbox size="sm" leftIcon={<Icon testID="left-icon" />} />);

    const icon = screen.getByTestId("left-icon");
    expect(icon.props.children).toBe("#171007-16");
  });

  it("should not render right icon when not provided", () => {
    render(<Textbox leftIcon={<Text testID="left-icon">◎</Text>} />);

    expect(screen.getByTestId("left-icon")).toBeOnTheScreen();
    expect(screen.queryByTestId("right-icon")).toBeNull();
  });
});

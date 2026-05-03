import { Text } from "react-native";
import { fireEvent, render, screen } from "@/lib/test-utils";
import { Button } from ".";

describe("Button", () => {
  let onPress: jest.Mock;
  const testId = "btn-login";

  beforeEach(() => {
    onPress = jest.fn();
  });

  it("should render title correctly", () => {
    render(<Button title="Login" testID={testId} onPress={onPress} />);
    expect(screen.getByTestId(testId)).toBeOnTheScreen();
    expect(screen.getByText("Login")).toBeOnTheScreen();
  });

  it("should call onPress when pressed", () => {
    render(<Button title="Login" testID={testId} onPress={onPress} />);
    const button = screen.getByTestId(testId);
    fireEvent(button, "press");
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should not call onPress when disabled", () => {
    render(<Button title="Login" testID={testId} onPress={onPress} disabled />);
    const button = screen.getByTestId(testId);
    fireEvent(button, "press");
    expect(onPress).not.toHaveBeenCalled();
  });

  it("should render left icon when provided", () => {
    render(
      <Button
        title="Login"
        testID={testId}
        leftIcon={<Text testID="left-icon">◎</Text>}
        variant="secondary"
      />,
    );

    expect(screen.getByTestId("left-icon")).toBeOnTheScreen();
  });
});

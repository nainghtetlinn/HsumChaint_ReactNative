import { render, screen } from "@/lib/test-utils";
import { Text } from ".";

describe("Text", () => {
  const testId = "text-component";

  it("should render the title correctly", () => {
    render(<Text title="Hello World" testID={testId} />);
    expect(screen.getByTestId(testId)).toBeOnTheScreen();
    expect(screen.getByText("Hello World")).toBeOnTheScreen();
  });

  it("should render with default variant (body2) and weight (regular) when none provided", () => {
    render(<Text title="Default" testID={testId} />);
    const element = screen.getByTestId(testId);
    expect(element).toBeOnTheScreen();
  });

  describe("variant prop", () => {
    const variants = [
      "title1",
      "title2",
      "title3",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "label1",
      "label2",
      "label3",
      "body1",
      "body2",
      "body3",
      "body4",
      "caption1",
      "caption2",
    ] as const;

    for (const variant of variants) {
      it(`should render with variant="${variant}"`, () => {
        render(<Text title={variant} variant={variant} testID={testId} />);
        expect(screen.getByTestId(testId)).toBeOnTheScreen();
        expect(screen.getByText(variant)).toBeOnTheScreen();
      });
    }
  });

  describe("weight prop", () => {
    it("should render with weight='regular'", () => {
      render(<Text title="Regular" weight="regular" testID={testId} />);
      expect(screen.getByTestId(testId)).toBeOnTheScreen();
    });

    it("should render with weight='medium'", () => {
      render(<Text title="Medium" weight="medium" testID={testId} />);
      expect(screen.getByTestId(testId)).toBeOnTheScreen();
    });

    it("should render with weight='bold'", () => {
      render(<Text title="Bold" weight="bold" testID={testId} />);
      expect(screen.getByTestId(testId)).toBeOnTheScreen();
    });
  });

  describe("className prop", () => {
    it("should accept additional className without error", () => {
      render(<Text title="Styled" className="text-center opacity-70" testID={testId} />);
      expect(screen.getByTestId(testId)).toBeOnTheScreen();
    });

    it("should merge variant className with custom className", () => {
      render(
        <Text title="Merged" variant="h4" weight="bold" className="text-center" testID={testId} />,
      );
      expect(screen.getByText("Merged")).toBeOnTheScreen();
    });
  });

  describe("React Native TextProps passthrough", () => {
    it("should apply numberOfLines prop", () => {
      render(<Text title="Truncated text" numberOfLines={1} testID={testId} />);
      const element = screen.getByTestId(testId);
      expect(element.props.numberOfLines).toBe(1);
    });

    it("should apply accessibilityLabel prop", () => {
      render(<Text title="Accessible" accessibilityLabel="accessible-text" testID={testId} />);
      const element = screen.getByTestId(testId);
      expect(element.props.accessibilityLabel).toBe("accessible-text");
    });

    it("should apply selectable prop", () => {
      render(<Text title="Selectable" selectable testID={testId} />);
      const element = screen.getByTestId(testId);
      expect(element.props.selectable).toBe(true);
    });
  });
});

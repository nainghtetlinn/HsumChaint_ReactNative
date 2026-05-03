import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Text } from "react-native";
import { fireEvent, render, screen, waitFor } from "@/lib/test-utils";
import { FormContainer, FormInputField } from ".";

type TestValues = { email: string };

describe("Form components", () => {
  it("should render children inside FormContainer", () => {
    render(
      <FormContainer>
        <Text testID="child">Child</Text>
      </FormContainer>,
    );

    expect(screen.getByTestId("child")).toBeOnTheScreen();
  });

  it("should render label and update value on change", () => {
    const TestForm = () => {
      const { control } = useForm<TestValues>({
        defaultValues: { email: "" },
      });
      const value = useWatch({ control, name: "email" });

      return (
        <>
          <FormInputField
            control={control}
            name="email"
            label="Email"
            testID="email-input"
            placeholder="Email"
          />
          <Text testID="value">{value}</Text>
        </>
      );
    };

    render(<TestForm />);

    expect(screen.getByText("Email")).toBeOnTheScreen();

    fireEvent.changeText(screen.getByTestId("email-input"), "a@b.com");

    expect(screen.getByTestId("value")).toHaveTextContent("a@b.com");
  });

  it("should show error message when field is invalid", async () => {
    const TestForm = () => {
      const { control, setError } = useForm<TestValues>({
        defaultValues: { email: "" },
      });

      useEffect(() => {
        setError("email", { type: "manual", message: "Required" });
      }, [setError]);

      return <FormInputField control={control} name="email" label="Email" testID="email-input" />;
    };

    render(<TestForm />);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeOnTheScreen();
    });
  });
});

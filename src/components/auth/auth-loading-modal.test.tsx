import { render, screen } from "@/lib/test-utils";
import { AuthLoadingModal } from "./auth-loading-modal";

describe("AuthLoadingModal", () => {
  it("renders the provided loading title", () => {
    render(<AuthLoadingModal show title="Logging in..." />);

    expect(screen.getByText("Logging in...")).toBeOnTheScreen();
  });
});

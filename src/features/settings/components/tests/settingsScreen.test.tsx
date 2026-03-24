import { screen } from "@testing-library/react";
import { act } from "react";
import i18n from "../../../../shared/i18n";
import renderComponent from "../../../../shared/testing/renderComponent.tsx";
import SettingsScreen from "../settingsScreen.tsx";

beforeEach(() => {
  localStorage.clear();
});

test("GIVEN Dutch is active, WHEN the settings screen is rendered, THEN the localized settings text is shown", async () => {
  await act(async () => {
    await i18n.changeLanguage("nl");
  });

  renderComponent(<SettingsScreen />);

  expect(
    screen.getByRole("heading", { name: "Profiel oefenen" }),
  ).toBeVisible();
  expect(
    screen.getByText("Kies hoe elke tafelsessie de vragen stelt."),
  ).toBeVisible();
  expect(screen.getByText("Volgorde van vragen")).toBeVisible();
  expect(
    screen.getByText(
      "Kies of vragen de tafelvolgorde volgen of in willekeurige volgorde verschijnen.",
    ),
  ).toBeVisible();
  expect(screen.getByText("In volgorde")).toBeVisible();
  expect(screen.getByText("Gestructureerd")).toBeVisible();
  expect(screen.getByText("Willekeurig")).toBeVisible();
  expect(screen.getByText("Gevarieerd")).toBeVisible();
  expect(screen.getByRole("button", { name: "Terug" })).toBeVisible();
});

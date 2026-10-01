import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import i18n from "./i18n";
import { App } from "./App";

describe("App shell", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("en");
  });

  it("renders identity, navigation, skip link, and one main landmark", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /vivnya/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "Portfolio navigation" }),
    ).toBeVisible();
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(
      screen.getByRole("link", { name: /skip to content/i }),
    ).toHaveAttribute("href", "#main-content");
  });

  it.each(["en", "ru"])(
    "includes the animation video and navigation in %s",
    async (language) => {
      await i18n.changeLanguage(language);
      const { container } = render(<App />);
      const label = language === "ru" ? "Анимации" : "Animations";
      expect(screen.getByRole("region", { name: label })).toBeVisible();
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        "#animations",
      );
      const player = screen.getByTitle("Kapishche — Animatic");
      expect(player).toHaveAttribute(
        "src",
        "https://www.youtube-nocookie.com/embed/RRoTocAVguE?rel=0",
      );
      expect(player).toHaveAttribute("allowFullScreen");
      expect(player).toHaveAttribute("loading", "lazy");
      expect(
        container.querySelector("#comics")?.nextElementSibling,
      ).toHaveAttribute("id", "animations");
      expect(
        screen.getByRole("link", { name: /Kapishche — Animatic.*ArtStation/i }),
      ).toHaveAttribute("href", "https://www.artstation.com/artwork/o0JlVw");
    },
  );
});

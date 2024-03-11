import { trackPageview, trackEvent } from "./analytics-api.js";

// Assigns a user variation, either "control" or "test",
// based on localStorage. If none is found, a random
// selection is made and stored in localStorage.
const assignVarient = () => {
  let abVarient = localStorage.getItem("ab_variation");

  if (!abVarient) {
    abVarient = Math.random() < 0.5 ? "control" : "test";
    localStorage.setItem("ab_variation", abVarient);
  }

  hideInactiveVariant(abVarient);

  return abVarient;
};

// Hides the inactive variant element based on the activeVariant.
const hideInactiveVariant = (activeVariant) => {
  const inactiveVariantId = activeVariant === "test" ? "control" : "test";

  const inactiveVariantElements = document.querySelectorAll(
    `[data-ab="${inactiveVariantId}"]`
  );

  if (inactiveVariantElements === null) return;

  if (inactiveVariantElements) {
    inactiveVariantElements.forEach((element) => {
      element.remove();
    });
  }
};

// Formats a tracking event string with the provided parameters.
const formatTrackingEvent = (page, abVarient, event, unique = false) => {
  return `{page: ${page}, variant: ${abVarient}, event: click_${event}, unique: ${unique}}`;
};

// Formats a page view string with the provided parameters.
const formatPageView = (page, abVarient, unique = false) => {
  return `{page: ${page}, variant: ${abVarient}, unique: ${unique}`;
};

// Tracks a click event for a button with the given name,
// page, and abtest variation. Checks if the event is unique
// and updates localStorage accordingly.
const trackClickEvent = (btnName, page, abVarient) => {
  const clickedKey = `${page}_${abVarient}_btn_clicked_${btnName}`;
  const btnClicked = localStorage.getItem(clickedKey);

  if (!btnClicked) {
    trackEvent(formatTrackingEvent(page, abVarient, btnName, true));
    localStorage.setItem(clickedKey, "true");
  } else {
    trackEvent(formatTrackingEvent(page, abVarient, btnName));
  }
};

// Tracks a unique pageview for the given page and abtest variation.
// Updates localStorage accordingly.
const trackPageviewUnique = (page, abVarient) => {
  const pageviewKey = `${page}_${abVarient}_unique`;
  const pageviewExists = localStorage.getItem(pageviewKey);

  if (!pageviewExists) {
    trackPageview(formatPageView(page, abVarient, true));
    localStorage.setItem(pageviewKey, "true");
  } else {
    trackPageview(formatPageView(page, abVarient));
  }
};

// Initializes the tracking functionality on DOMContentLoaded.
// Assigns user variation, tracks unique pageviews, and sets
// up click event listeners for buttons.
const init = () => {
  const page = window.location.pathname;
  const abVarient = assignVarient();

  trackPageviewUnique(page, abVarient);

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      trackClickEvent(button.id, page, abVarient);
    });
  });
};

document.addEventListener("DOMContentLoaded", init);

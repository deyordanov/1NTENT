// Plausible custom event tracking
// Events:
//   HeroVariant (prop: variant A/B/C) — which headline shown
//   TestStarted — first question answered
//   TestCompleted — all 10 questions answered
//   EmailSubmitted — email form submitted
//   CalendlyClicked — clicked "book a call"
//   ExitIntentShown — exit popup appeared
//   ExitIntentClicked — clicked CTA in exit popup
//   MobileCTAClicked — clicked mobile sticky CTA
//   ReferralCopied — copied referral link
//   ReferralShared (prop: channel) — shared via WhatsApp/Viber/other
//   TestAbandoned (props: question, progress) — left test early, shows which question and % completed

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

export function trackEvent(
  event: string,
  props?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}

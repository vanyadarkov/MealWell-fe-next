import posthog from "posthog-js";

export enum PostHogEventType {
  PAGE_VIEWED = "Page Viewed",
  SUBMIT_FORM = "Submit form",
}

type BaseEventProperties = {
  username?: string;
  userId?: string;
  description?: string;
};

type PageViewedEvent = BaseEventProperties & {
  eventType: PostHogEventType.PAGE_VIEWED;
  path: string;
};

type FormIdentifier = "newsletter";

type FormSubmitEvent = BaseEventProperties & {
  eventType: PostHogEventType.SUBMIT_FORM;
  form: FormIdentifier;
  submitStatus?: "success" | "error";
};

export type PostHogEventProperties = PageViewedEvent | FormSubmitEvent;

export const logEventClient = (properties: PostHogEventProperties) => {
  posthog.capture(properties.eventType, properties);
};
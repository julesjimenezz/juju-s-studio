// One shared definition of the "analytics" object that every generate route
// asks the AI to fill in. Campaign Lab proved the pattern first; keeping the
// schema in a single file means the four modules can't quietly drift apart
// the way four hand-copied JSON blobs inevitably would.
//
// The numbers this produces are the AI's own quantified judgement — expert
// estimates and projections, NOT measured market data. Every surface that
// renders them says so, and the system-prompt note below makes sure the model
// understands that framing too.

export const ANALYTICS_PROPERTY = {
  type: "object",
  description:
    "Your quantified strategic assessment for this brand. These are your expert ESTIMATES/PROJECTIONS, not measured market data.",
  properties: {
    momentum: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description:
        "How much cultural momentum this trend/angle has right now (0-100)."
    },
    opportunityScore: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description:
        "How strong the strategic opportunity is for THIS specific brand (0-100)."
    },
    audienceFit: {
      type: "string",
      description:
        "A one-word or two-word rating of audience fit, e.g. 'Strong', 'Moderate', 'Emerging'."
    },
    primaryChannel: {
      type: "string",
      description:
        "The single highest-priority channel to act on this through, e.g. 'TikTok'."
    },
    launchWindow: {
      type: "string",
      description: "A short timing label, e.g. 'Early Fall'."
    },
    channelPriority: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      description:
        "Recommended channels ranked by priority, each with a weight 0-100 (they do not need to sum to 100).",
      items: {
        type: "object",
        properties: {
          channel: { type: "string" },
          weight: { type: "integer", minimum: 0, maximum: 100 }
        },
        required: ["channel", "weight"]
      }
    },
    audienceSegments: {
      type: "array",
      minItems: 3,
      maxItems: 4,
      description:
        "The main audience segments here, each with an approximate share (the shares should sum to roughly 100).",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          share: { type: "integer", minimum: 0, maximum: 100 }
        },
        required: ["label", "share"]
      }
    }
  },
  required: [
    "momentum",
    "opportunityScore",
    "audienceFit",
    "primaryChannel",
    "launchWindow",
    "channelPriority",
    "audienceSegments"
  ]
} as const;

export const ANALYTICS_SYSTEM_NOTE =
  " The 'analytics' fields are your own quantified strategic assessment — expert estimates and projections, NOT measured real-world data — so make the scores thoughtful and specific to this brand, varying them realistically rather than defaulting to round or identical numbers.";

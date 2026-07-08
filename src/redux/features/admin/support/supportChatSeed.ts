import type {
  SupportChatBootstrapPayload,
  SupportConversation,
  SupportMessage,
} from "@/src/types/adminSupportChatTypes";

type SeedConversationConfig = Omit<
  SupportConversation,
  "lastMessageAt" | "lastMessagePreview" | "typing"
>;

const previewText = (value: string) =>
  value.length > 84 ? `${value.slice(0, 81)}...` : value;

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

function buildMessage(
  id: string,
  conversationId: string,
  sender: SupportMessage["sender"],
  senderName: string,
  body: string,
  createdAt: string,
  status: SupportMessage["status"] = "read",
): SupportMessage {
  return {
    id,
    conversationId,
    sender,
    senderName,
    body,
    createdAt,
    status,
  };
}

function buildConversation(
  config: SeedConversationConfig,
  messages: SupportMessage[],
): SupportConversation {
  const lastMessage = messages[messages.length - 1];

  return {
    ...config,
    typing: false,
    lastMessageAt: lastMessage.createdAt,
    lastMessagePreview: previewText(lastMessage.body),
  };
}

export const supportChatSimulationReplies: Record<string, string[]> = {
  "support-mandy": [
    "Hey! I'm making good time. Should arrive around 3:15 PM.",
    "Confirmed. ETA is 3:15 PM.",
    "I will call the receiver 30 minutes before arrival.",
  ],
  "support-jennifer": [
    "Thanks. I found the missing receipt on my end. Sending it over in a minute.",
    "Confirmed, the billing amount is correct now. You can close this thread.",
    "I re-checked the invoice and the updated PDF matches the portal.",
  ],
  "support-robinson": [
    "POD is signed and uploaded. Let me know if the finance team needs anything else.",
    "Delivery is complete. I'm heading back to the yard now.",
    "Everything has been wrapped up on this load from my side.",
  ],
  "support-jacob": [
    "I just requested the missing document from the shipper and should have it shortly.",
    "Upload is failing on mobile, but I can send the image from desktop in a few minutes.",
    "Document received. I'll attach the final copy once it's compressed.",
  ],
  "support-olivia": [
    "Weather cleared up a bit. Updated ETA is 5:40 PM and I'm moving again.",
    "The route is still slow near the bridge, but there are no further delays yet.",
    "Receiver has been updated with the latest ETA from my side.",
  ],
};

export function buildAdminSupportChatSeed(): SupportChatBootstrapPayload {
  const mandyMessages = [
    buildMessage(
      "mandy-1",
      "support-mandy",
      "admin",
      "Admin Support",
      "Hi James, just checking on your ETA for load 2024125-5-001",
      minutesAgo(48),
    ),
    buildMessage(
      "mandy-2",
      "support-mandy",
      "customer",
      "Springle Burger",
      "Hey! I'm making good time. Should arrive around 3:15 PM.",
      minutesAgo(39),
    ),
    buildMessage(
      "mandy-3",
      "support-mandy",
      "admin",
      "Admin Support",
      "Great! Make sure to call the receiver 30 minutes before arrival",
      minutesAgo(28),
    ),
    buildMessage(
      "mandy-4",
      "support-mandy",
      "customer",
      "Springle Burger",
      "Confirmed. ETA is 3:15 PM",
      minutesAgo(20),
    ),
    buildMessage(
      "mandy-5",
      "support-mandy",
      "customer",
      "Springle Burger",
      "Hi, Mandy...",
      minutesAgo(11),
    ),
  ];

  const jenniferMessages = [
    buildMessage(
      "jennifer-1",
      "support-jennifer",
      "customer",
      "Jennifer Mason",
      "Really? The receipt total in the dashboard still looks different from the PDF.",
      minutesAgo(67),
    ),
    buildMessage(
      "jennifer-2",
      "support-jennifer",
      "admin",
      "Admin Support",
      "I am reviewing the latest statement now. Please keep this thread open for a moment.",
      minutesAgo(61),
    ),
    buildMessage(
      "jennifer-3",
      "support-jennifer",
      "customer",
      "Jennifer Mason",
      "No problem. I can wait while you verify it.",
      minutesAgo(54),
    ),
  ];

  const robinsonMessages = [
    buildMessage(
      "robinson-1",
      "support-robinson",
      "customer",
      "Robinson Miles",
      "Transportation done. Receiver is asking when the signed POD will show up in the portal.",
      minutesAgo(89),
    ),
    buildMessage(
      "robinson-2",
      "support-robinson",
      "admin",
      "Admin Support",
      "Once the file is uploaded, finance should see it almost instantly.",
      minutesAgo(80),
    ),
    buildMessage(
      "robinson-3",
      "support-robinson",
      "customer",
      "Robinson Miles",
      "Perfect. I am uploading it now.",
      minutesAgo(72),
    ),
  ];

  const jacobMessages = [
    buildMessage(
      "jacob-1",
      "support-jacob",
      "customer",
      "Jacob Lee",
      "I still need the gate pass image attached to the load before payroll can process it.",
      minutesAgo(117),
    ),
    buildMessage(
      "jacob-2",
      "support-jacob",
      "admin",
      "Admin Support",
      "Understood. Please send the image here once the file is ready.",
      minutesAgo(108),
    ),
    buildMessage(
      "jacob-3",
      "support-jacob",
      "customer",
      "Jacob Lee",
      "Will do. I should have a clean copy once I get back into better signal.",
      minutesAgo(103),
    ),
  ];

  const oliviaMessages = [
    buildMessage(
      "olivia-1",
      "support-olivia",
      "customer",
      "Olivia Turner",
      "Weather delay on I-84. I already notified the broker, but I wanted support to have the latest ETA too.",
      minutesAgo(143),
    ),
    buildMessage(
      "olivia-2",
      "support-olivia",
      "admin",
      "Admin Support",
      "Thanks for the heads up. Keep sharing ETA changes here so the timeline stays clean.",
      minutesAgo(136),
    ),
    buildMessage(
      "olivia-3",
      "support-olivia",
      "customer",
      "Olivia Turner",
      "Current ETA is 5:55 PM unless traffic opens up.",
      minutesAgo(126),
    ),
  ];

  const messagesByConversationId: Record<string, SupportMessage[]> = {
    "support-mandy": mandyMessages,
    "support-jennifer": jenniferMessages,
    "support-robinson": robinsonMessages,
    "support-jacob": jacobMessages,
    "support-olivia": oliviaMessages,
  };

  const conversations = [
    buildConversation(
      {
        id: "support-mandy",
        participantName: "Springle Burger",
        participantEmail: "burger@gmail.com",
        participantRoleLabel: "Driver",
        carrierName: "Roadside LTD",
        loadReference: "2026-04-17-001",
        initials: "SB",
        avatarColor: "#5138EE",
        notes:
          "Priority load with receiver delivery window closing at 4:00 PM. Keep ETA updates visible for the ops team.",
        etaLabel: "ETA 3:15 PM",
        unreadCount: 2,
        online: true,
        priority: "high",
        status: "active",
        quickActions: [
          {
            id: "mandy-docs",
            label: "Need documents?",
            message:
              "Please upload the pickup sheet and signed POD once unloading is complete.",
            tone: "secondary",
          },
          {
            id: "mandy-eta",
            label: "Request Documents",
            message:
              "Please upload the pickup sheet and signed POD once unloading is complete.",
            tone: "primary",
          },
        ],
      },
      mandyMessages,
    ),
    buildConversation(
      {
        id: "support-jennifer",
        participantName: "Jennifer Mason",
        participantEmail: "jennifer.mason@ledgerlane.example",
        participantRoleLabel: "Dispatcher",
        carrierName: "Ledger Lane",
        loadReference: "INV-20411",
        initials: "JM",
        avatarColor: "#F97316",
        notes:
          "Billing thread tied to invoice INV-20411. Keep finance responses documented in-chat for audit history.",
        etaLabel: "Waiting on receipt",
        unreadCount: 1,
        online: true,
        priority: "medium",
        status: "waiting",
        quickActions: [
          {
            id: "jennifer-receipt",
            label: "Share Receipt Link",
            message:
              "I am sending the updated receipt link now. Please confirm once the total matches your PDF.",
            tone: "primary",
          },
          {
            id: "jennifer-close",
            label: "Ask To Close",
            message:
              "If the updated amount looks correct on your side, I can mark this billing case as resolved.",
            tone: "secondary",
          },
        ],
      },
      jenniferMessages,
    ),
    buildConversation(
      {
        id: "support-robinson",
        participantName: "Robinson Miles",
        participantEmail: "robinson.miles@haulnest.example",
        participantRoleLabel: "Driver",
        carrierName: "Haulnest Freight",
        loadReference: "POD-88421",
        initials: "RM",
        avatarColor: "#16A34A",
        notes:
          "Delivery complete. Remaining work is only document confirmation and finance visibility.",
        etaLabel: "Delivered",
        unreadCount: 0,
        online: false,
        priority: "low",
        status: "resolved",
        quickActions: [
          {
            id: "robinson-pod",
            label: "Confirm POD",
            message:
              "Thanks. Once the signed POD is uploaded, I will confirm it for finance from here.",
            tone: "primary",
          },
        ],
      },
      robinsonMessages,
    ),
    buildConversation(
      {
        id: "support-jacob",
        participantName: "Jacob Lee",
        participantEmail: "jacob.lee@transitcore.example",
        participantRoleLabel: "Driver",
        carrierName: "Transit Core",
        loadReference: "DOC-11803",
        initials: "JL",
        avatarColor: "#0EA5E9",
        notes:
          "This thread is blocked on a gate pass image. Attachments API is not live yet, so chat guidance should stay explicit.",
        etaLabel: "Pending upload",
        unreadCount: 0,
        online: false,
        priority: "medium",
        status: "waiting",
        quickActions: [
          {
            id: "jacob-upload",
            label: "Request Upload",
            message:
              "Please send the gate pass image here as soon as you have a clean copy available.",
            tone: "primary",
          },
        ],
      },
      jacobMessages,
    ),
    buildConversation(
      {
        id: "support-olivia",
        participantName: "Olivia Turner",
        participantEmail: "olivia.turner@northtrail.example",
        participantRoleLabel: "Driver",
        carrierName: "Northtrail Carriers",
        loadReference: "WX-55290",
        initials: "OT",
        avatarColor: "#EC4899",
        notes:
          "Weather delay thread. Ops, broker, and customer ETA communication should stay in sync.",
        etaLabel: "ETA 5:55 PM",
        unreadCount: 0,
        online: true,
        priority: "high",
        status: "active",
        quickActions: [
          {
            id: "olivia-broker",
            label: "Update Broker",
            message:
              "Please send the broker your latest ETA and keep this thread updated with any major route changes.",
            tone: "primary",
          },
          {
            id: "olivia-receiver",
            label: "Notify Receiver",
            message:
              "If the ETA shifts again, notify the receiver immediately so they can adjust the dock window.",
            tone: "secondary",
          },
        ],
      },
      oliviaMessages,
    ),
  ].sort(
    (left, right) =>
      new Date(right.lastMessageAt).getTime() -
      new Date(left.lastMessageAt).getTime(),
  );

  return {
    activeConversationId: "support-mandy",
    conversations,
    messagesByConversationId,
    draftsByConversationId: {
      "support-mandy": "",
      "support-jennifer": "",
      "support-robinson": "",
      "support-jacob": "",
      "support-olivia": "",
    },
  };
}

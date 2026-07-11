import type { FetchArgs } from "@reduxjs/toolkit/query/react";

const DEFAULT_META = {
  total: 0,
  page: 1,
  last_page: 1,
  limit: 10,
};

const DESIGN_MODE_MESSAGE =
  "API calls are disabled in design mode. Redux and RTK Query remain active for future integration.";

type ApiArgs = string | FetchArgs;

const getUrl = (args: ApiArgs) =>
  typeof args === "string" ? args : (args.url ?? "");

const getMethod = (args: ApiArgs) =>
  typeof args === "string" ? "GET" : (args.method ?? "GET").toUpperCase();

const getBody = (args: ApiArgs) =>
  typeof args === "string" ? undefined : args.body;

const buildSuccess = <T>(data: T, extra?: Record<string, unknown>) => ({
  success: true,
  message: DESIGN_MODE_MESSAGE,
  data,
  ...extra,
});

const buildPaginated = (data: unknown[] = [], meta = DEFAULT_META) =>
  buildSuccess(data, { meta });

export const buildDesignModeResponse = (args: ApiArgs) => {
  const url = getUrl(args);
  const method = getMethod(args);
  const body = getBody(args) as Record<string, unknown> | undefined;

  if (url === "/auth/login") {
    const email = String(body?.email ?? "").toLowerCase();
    const role = email.includes("super")
      ? "super-admin"
      : email.includes("dispatcher")
        ? "dispatcher"
        : "admin";

    return {
      success: true,
      message: "Signed in locally in design mode.",
      type: role,
      authorization: {
        access_token: `design-mode-${role}-token`,
        refresh_token: `design-mode-${role}-refresh-token`,
      },
    };
  }

  if (url.startsWith("/auth/")) {
    return {
      success: true,
      message: DESIGN_MODE_MESSAGE,
    };
  }

  if (url === "/dashboard/overview") {
    return buildSuccess({
      ownerName: "Johan",
      summaryStats: [
        {
          id: "total-streams",
          title: "Total Streams",
          value: "14.9M",
          trend: { direction: "up", label: "+18% vs last month" },
        },
        {
          id: "in-progress",
          title: "In Progress",
          value: "1",
          trend: { direction: "up", label: "+2% vs last month" },
        },
        {
          id: "total-published",
          title: "Total Published",
          value: "2",
          trend: { direction: "up", label: "+4% vs last month" },
        },
        {
          id: "active-releases",
          title: "Active Releases",
          value: "18",
          trend: { direction: "down", label: "-2 pending review" },
        },
      ],
      streamingPerformance: [
        { month: "Jan", streams: 620000 },
        { month: "Feb", streams: 780000 },
        { month: "Mar", streams: 910000 },
        { month: "Apr", streams: 860000 },
        { month: "May", streams: 1020000 },
        { month: "Jun", streams: 980000 },
        { month: "Jul", streams: 1180000 },
        { month: "Aug", streams: 1340000 },
        { month: "Sep", streams: 1210000 },
        { month: "Oct", streams: 1480000 },
        { month: "Nov", streams: 1720000 },
        { month: "Dec", streams: 2080000 },
      ],
      platformShares: [
        {
          id: "spotify",
          platform: "Spotify",
          streams: 8400000,
          colorToken: "primary",
        },
        {
          id: "apple-music",
          platform: "Apple Music",
          streams: 3200000,
          colorToken: "danger",
        },
        {
          id: "youtube-music",
          platform: "YouTube Music",
          streams: 2800000,
          colorToken: "danger",
        },
        {
          id: "amazon-music",
          platform: "Amazon Music",
          streams: 1000000,
          colorToken: "info",
        },
        { id: "tidal", platform: "Tidal", streams: 420000, colorToken: "info" },
      ],
      totalPlatformStreams: 15900000,
      topTracks: [
        {
          id: "1",
          rank: 1,
          title: "Neon Mirage",
          releaseTitle: "Afterglow",
          streams: 4200000,
          duration: "3:48",
          trend: { direction: "up", label: "+12%" },
        },
        {
          id: "2",
          rank: 2,
          title: "Broken Signal",
          releaseTitle: "Frequency",
          streams: 3800000,
          duration: "4:12",
          trend: { direction: "up", label: "+8%" },
        },
        {
          id: "3",
          rank: 3,
          title: "Midnight Protocol",
          releaseTitle: "Afterglow",
          streams: 2900000,
          duration: "3:22",
          trend: { direction: "down", label: "-3%" },
        },
        {
          id: "4",
          rank: 4,
          title: "Echo Chamber",
          releaseTitle: "Frequency",
          streams: 2400000,
          duration: "5:01",
          trend: { direction: "up", label: "+21%" },
        },
        {
          id: "5",
          rank: 5,
          title: "Static Dreams",
          releaseTitle: "Lost Frequencies",
          streams: 1900000,
          duration: "3:55",
          trend: { direction: "up", label: "+5%" },
        },
      ],
      albumSpotlight: {
        id: "afterglow",
        title: "Afterglow",
        trackCount: 12,
        countryCount: 48,
        coverImageUrl: "/images/card_1.jpg",
        previewAudioUrl: "/audio/track_1.flac",
        tracks: [
          { id: "1", title: "Neon Mirage", audioUrl: "/audio/track_1.flac" },
          { id: "2", title: "Broken Signal", audioUrl: "/audio/track-2.wav" },
          {
            id: "3",
            title: "Midnight Protocol",
            audioUrl: "/audio/track-3.wav",
          },
          { id: "4", title: "Echo Chamber", audioUrl: "/audio/track-4.wav" },
        ],
      },
      recentActivity: [
        {
          id: "1",
          kind: "milestone",
          message: "Neon Mirage crossed 4M streams",
          occurredAgo: "2h ago",
        },
        {
          id: "2",
          kind: "audience",
          message: "847 new followers today",
          occurredAgo: "5h ago",
        },
        {
          id: "3",
          kind: "playlist",
          message: "Broken Signal added to 3 editorial playlists",
          occurredAgo: "1d ago",
        },
        {
          id: "4",
          kind: "royalty",
          message: "November royalty payout: $7,560",
          occurredAgo: "2d ago",
        },
        {
          id: "5",
          kind: "collaboration",
          message: "Collaboration request from ZARA LYRA",
          occurredAgo: "3d ago",
        },
      ],
      upcomingReleases: [
        {
          id: "1",
          title: "Ghost Frequency",
          releaseType: "Single",
          releaseDate: "2024-12-20",
          status: "Scheduled",
        },
        {
          id: "2",
          title: "Afterglow (Deluxe)",
          releaseType: "Album",
          releaseDate: "2025-01-15",
          status: "In Review",
        },
      ],
    });
  }

  if (url === "/analytics/overview") {
    return buildSuccess({
      summaryStats: [
        {
          id: "total-streams",
          title: "Total Streams",
          value: "14.9M",
          trend: { direction: "up", label: "+18% vs last month" },
        },
        {
          id: "avg-daily-streams",
          title: "Avg. Daily Streams",
          value: "40.8k",
          trend: { direction: "up", label: "+5% vs prior period" },
        },
        {
          id: "save-rate",
          title: "Save Rate",
          value: "8.4%",
          trend: { direction: "up", label: "+1.2% improvement" },
        },
        {
          id: "skip-rate",
          title: "Skip Rate",
          value: "22.1%",
          trend: { direction: "up", label: "-3.2% improvement" },
        },
      ],
      streamTrend: [
        { month: "Jan", streams: 620000 },
        { month: "Feb", streams: 780000 },
        { month: "Mar", streams: 910000 },
        { month: "Apr", streams: 860000 },
        { month: "May", streams: 1020000 },
        { month: "Jun", streams: 980000 },
        { month: "Jul", streams: 1180000 },
        { month: "Aug", streams: 1340000 },
        { month: "Sep", streams: 1210000 },
        { month: "Oct", streams: 1480000 },
        { month: "Nov", streams: 1720000 },
        { month: "Dec", streams: 2080000 },
      ],
      topCountries: [
        { id: "us", country: "United States", streams: 5100000 },
        { id: "uk", country: "United Kingdom", streams: 2700000 },
        { id: "de", country: "Germany", streams: 1800000 },
        { id: "br", country: "Brazil", streams: 1300000 },
        { id: "in", country: "India", streams: 1000000 },
        { id: "others", country: "Others", streams: 3000000 },
      ],
      trackPerformance: [
        {
          id: "1",
          rank: 1,
          title: "Neon Mirage",
          releaseTitle: "Afterglow",
          streams: 4200000,
          duration: "3:48",
          trend: { direction: "up", label: "+12%" },
        },
        {
          id: "2",
          rank: 2,
          title: "Broken Signal",
          releaseTitle: "Frequency",
          streams: 3800000,
          duration: "4:12",
          trend: { direction: "up", label: "+8%" },
        },
        {
          id: "3",
          rank: 3,
          title: "Midnight Protocol",
          releaseTitle: "Afterglow",
          streams: 2900000,
          duration: "3:22",
          trend: { direction: "down", label: "-3%" },
        },
        {
          id: "4",
          rank: 4,
          title: "Echo Chamber",
          releaseTitle: "Frequency",
          streams: 2400000,
          duration: "5:01",
          trend: { direction: "up", label: "+21%" },
        },
        {
          id: "5",
          rank: 5,
          title: "Static Dreams",
          releaseTitle: "Lost Frequencies",
          streams: 1900000,
          duration: "3:55",
          trend: { direction: "up", label: "+5%" },
        },
      ],
    });
  }

  if (url === "/guide/overview") {
    return buildSuccess({
      faqs: [
        {
          id: "distribute-music",
          question: "How do I distribute my music to all platforms?",
          answer:
            "Go to Create New Release, fill in your track details, upload your audio and cover art, then select the platforms under Distribution. Your release will go live on the scheduled date after passing moderation.",
        },
        {
          id: "audio-formats",
          question: "What audio formats are accepted?",
          answer:
            "We accept WAV and FLAC files at 16-bit/44.1kHz or higher. For best quality, upload an uncompressed WAV exported directly from your mastering session.",
        },
        {
          id: "moderation-time",
          question: "How long does moderation take?",
          answer:
            "Most releases are reviewed within 24 to 48 hours. Releases submitted close to their scheduled date may take longer, so we recommend submitting at least 5 days in advance.",
        },
        {
          id: "royalties",
          question: "How are royalties calculated and paid?",
          answer:
            "Royalties are calculated per stream based on each platform's payout rate, aggregated monthly, and paid out to your connected account once your balance passes the minimum payout threshold.",
        },
        {
          id: "isrc-code",
          question: "What is an ISRC code and do I need one?",
          answer:
            "An ISRC is a unique identifier used to track streams and sales for a specific recording. We automatically generate one for every track unless you supply your own.",
        },
        {
          id: "update-release",
          question: "Can I update a release after it goes live?",
          answer:
            "Yes. You can update artwork, metadata, and credits at any time from Your Releases. Audio file changes require a new release, since platforms treat it as a distinct recording.",
        },
      ],
    });
  }

  if (url === "/notifications/overview") {
    return buildSuccess({
      notifications: [
        {
          id: "1",
          kind: "milestone",
          title: "Neon Mirage hit 4M streams",
          message: "Your track crossed a milestone on Spotify.",
          occurredAgo: "2h ago",
          isRead: false,
        },
        {
          id: "2",
          kind: "follower",
          title: "New follower milestone",
          message: "You now have 241,000 followers across platforms.",
          occurredAgo: "5h ago",
          isRead: false,
        },
        {
          id: "3",
          kind: "playlist",
          title: "Playlist placement",
          message: "Broken Signal was added to 3 Spotify editorial playlists.",
          occurredAgo: "1d ago",
          isRead: false,
        },
        {
          id: "4",
          kind: "royalty",
          title: "Royalty payout processed",
          message: "November earnings of $7,560 have been deposited.",
          occurredAgo: "2d ago",
          isRead: true,
        },
        {
          id: "5",
          kind: "changes",
          title: "Changes required",
          message: "Broken Signal (Acoustic) has cover art issues.",
          occurredAgo: "5d ago",
          isRead: true,
        },
        {
          id: "6",
          kind: "collaboration",
          title: "Collaboration request",
          message: "ZARA LYRA wants to collaborate on an upcoming project.",
          occurredAgo: "1w ago",
          isRead: true,
        },
      ],
    });
  }

  if (url === "/admin/dashboard/states") {
    return buildSuccess({
      pending_director_applications: 0,
      total_completed_donations: 0,
      total_completed_subscriptions: 0,
    });
  }

  if (url === "/director/dashboard/stats") {
    return buildSuccess({
      total_notices: 0,
      total_condolances: 0,
      total_donations: 0,
    });
  }

  if (url === "/dispatcher/dashboard/stats") {
    return buildSuccess({
      total_jobs: 0,
      active_shipments: 0,
      completed_today: 0,
    });
  }

  if (url === "/super-admin/dashboard/stats") {
    return buildSuccess({
      total_admins: 0,
      total_dispatchers: 0,
      active_workspaces: 0,
    });
  }

  if (url.includes("/death-notice/graph")) {
    return buildSuccess({
      categories: [],
      series: [],
    });
  }

  if (url.includes("/notice-views/graph")) {
    return buildSuccess({
      total_views: 0,
      labels: [],
      this_week: [],
      last_week: [],
    });
  }

  if (url.includes("/notice-area/graph")) {
    return buildSuccess({
      labels: [],
      values: [],
    });
  }

  if (url.includes("recent")) {
    return buildPaginated();
  }

  if (method === "GET") {
    return buildSuccess({}, { meta: DEFAULT_META });
  }

  return {
    success: true,
    message: DESIGN_MODE_MESSAGE,
  };
};

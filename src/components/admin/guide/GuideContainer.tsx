"use client";

// import { useGetGuideOverviewQuery } from "@/src/redux/features/guide/guideOverviewApi";
import {
  FaqAccordion,
  GuideError,
  GuidePageHeader,
  GuideSkeleton,
} from "@/src/components/design/guide";
import { guideFaqData } from "../../design/guide/data/guide-faqData";

export default function GuideContainer() {
  // const { data, isLoading, isFetching, isError, refetch } =
  //   useGetGuideOverviewQuery();

  // if (isLoading || (isFetching && !data)) {
  //   return <GuideSkeleton />;
  // }

  // if (isError || !data) {
  //   return <GuideError onRetry={refetch} />;
  // }

  const overview = guideFaqData;

  return (
    <div className="space-y-6" data-tour="page-guide">
      <GuidePageHeader />
      <FaqAccordion faqs={overview.faqs} />
    </div>
  );
}

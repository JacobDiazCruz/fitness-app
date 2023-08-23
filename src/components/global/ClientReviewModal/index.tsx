import { getCurrentClientCoaching } from "@/api/Client";
import { useState } from "react";
import { useQuery } from "react-query";
import ClientReviewModalForm from "./ClientReviewModalForm";

export default function ClientReviewModal() {
  const [showReviewModal, setShowReviewModal] = useState<boolean>(true);
  
  // list coaching plans
  // @TASK: make a status in clientCoachRelation if the client already provided a feedback or not
  // add additional condition if session reaches 0
  const {
    isLoading, 
    isError,
    data: coachingData,
    error
  } = useQuery("coachingData", getCurrentClientCoaching, {
    refetchOnMount: true
  });

  if(isLoading) return <></>;

  if(isError) return <></>;

  return (
    <>
      {showReviewModal && (
        <ClientReviewModalForm 
          onClose={() => setShowReviewModal(false)} 
          coachingData={coachingData}
        />
      )}
    </>
  );
};
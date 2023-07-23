import { getCoachingServices } from "@/api/CoachingService";
import { useParams } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";

const CoachingServiceContext = createContext(null);

export const CoachingServiceProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const params = useParams();
  
  const {
    data: coachingServices,
  } = useQuery('coachingServices', () => getCoachingServices(params.id), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const value = {
    coachingServices: coachingServices || []
  }

  return (
    <CoachingServiceContext.Provider value={value}>
      {children}
    </CoachingServiceContext.Provider>
  );
};

const useCoachingService = () => {
  const context = useContext(CoachingServiceContext)
  if (context === undefined) {
    throw new Error("useCoachingService must be used within the CoachingServiceContext context")
  }
  return context;
};

export default useCoachingService;
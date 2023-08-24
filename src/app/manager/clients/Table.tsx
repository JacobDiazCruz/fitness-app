'use client';

import { useEffect, useState } from "react";
import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import TableLoader from "@/components/global/TableLoader";
import { primaryTextColor } from "@/utils/themeColors";
import TableNoResults from "@/components/global/TableNoResults";
import { listClients } from "@/api/Client";
import CoachingOrderDetailsModal from "@/components/global/CoachingOrderDetailsModal";

const TableColumnHeaders = () => {
  return (
    <div className={`${primaryTextColor} flex justify-between px-5 py-3 text-[14px]`}>
      <div className="flex-1">
        <p>Clients</p>
      </div>
      <div className="flex-1">
        <p>Status</p>
      </div>
      <div className="flex-1">
        <p>Date added</p>
      </div>
      <div className="w-[32px]"></div>
    </div>
  );
};

export default function Table() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [showCoachingOrderDetailsModal, setShowCoachingOrderDetailsModal] = useState<boolean>(false);
  const { 
    isLoading, 
    isError,
    data: clients = [],
    error
  } = useQuery('clients', listClients, {
    refetchOnMount: true
  });

  // Search filter logic
  useEffect(() => {
    if(clients && Array.isArray(clients)) {
      const filteredClients = clients?.filter((client: any) =>
        client?.client.firstName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredClients(filteredClients);
    }
  }, [searchValue, clients]);

  // Return loading state if data is still loading
  if (isLoading) {
    return (
      <>
        <TableActions
          primaryBtnContent="Add New Client"
          primaryBtnIcon={<AddIcon />}
          primaryBtnPath="/manager/clients/add"
          searchValue={searchValue}
          handleSearch={(value) => {
            setSearchValue(value)
          }}
        />
        <div className="page-table mt-8">
          <TableColumnHeaders />
          <TableLoader />
        </div>
      </>
    );
  }

  // Return error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Return table if data is available
  return (
    <>
      <TableActions 
        primaryBtnContent="Add New Client"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/clients/add"
        searchValue={searchValue}
        handleSearch={(value) => {
          setSearchValue(value)
        }}
      />
      <div className="page-table mt-8">
        <TableColumnHeaders primaryTextColor={primaryTextColor} />
        {filteredClients?.length <= 0 ? (
          <TableNoResults />
        ) : (
          filteredClients?.map((clientData: any, index: number) => {
            const { _id, createdAt } = clientData;
            const { 
              thumbnailImage,
              firstName,
              lastName,
              email
            } = clientData?.client;

            return (
              <TableItem
                key={index}
                itemId={_id}
                handleRowClick={() => setShowCoachingOrderDetailsModal(true)}
                fullName={`${firstName} ${lastName}`}
                email={email}
                createdAt={createdAt}
                thumbnailImage={thumbnailImage}
              />
            );
          })
        )}
      </div>

      {showCoachingOrderDetailsModal && (
        <CoachingOrderDetailsModal 
          onClose={() => setShowCoachingOrderDetailsModal(false)}
        />
      )}
    </>
  );
}
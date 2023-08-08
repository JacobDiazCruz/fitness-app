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
import { listOrders } from "@/api/Order";

const TableColumnHeaders = () => {
  return (
    <div className={`${primaryTextColor} flex justify-between px-5 py-3 text-[14px]`}>
      <div className="flex-1">
        <p>Order id</p>
      </div>
      <div className="flex-1">
        <p>Item</p>
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
  const [filteredOrders, setfilteredOrders] = useState([]);
  const { 
    isLoading, 
    isError,
    data: orders = [],
    error
  } = useQuery('orders', listOrders, {
    refetchOnMount: true
  });

  // Search filter logic
  useEffect(() => {
    if(orders && Array.isArray(orders)) {
      setfilteredOrders(orders);
    }
  }, [searchValue, orders]);

  // Return loading state if data is still loading
  if (isLoading) {
    return (
      <>
        <TableActions
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
        searchValue={searchValue}
        handleSearch={(value) => {
          setSearchValue(value)
        }}
      />
      <div className="page-table mt-8">
        <TableColumnHeaders primaryTextColor={primaryTextColor} />
        {filteredOrders?.length <= 0 ? (
          <TableNoResults />
        ) : (
          filteredOrders?.map((orderData: any, index: number) => {
            const { 
              _id,
              type,
              status,
              sellerDetails,
              createdAt
            } = orderData;

            return (
              <TableItem
                key={index}
                itemId={_id}
                status={status}
                sellerDetails={sellerDetails}
                createdAt={createdAt}
              />
            );
          })
        )}
      </div>
    </>
  );
}

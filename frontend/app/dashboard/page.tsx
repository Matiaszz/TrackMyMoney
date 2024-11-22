"use client";
import { useEffect, useState } from "react";
import {
  Transaction,
  transactionTypeNames,
  useFetchTransactions,
} from "../utils/fetch";

const dashboardPage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center content-center">Hello World!</div>
      <div className="flex justify-center content-center">h2lloe2</div>
    </div>
  );
};
export default dashboardPage;

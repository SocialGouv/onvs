import { parseISO } from "date-fns";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig() || {};

export const now = () =>
  (publicRuntimeConfig?.TEST_CURRENT_DATE &&
    parseISO(publicRuntimeConfig?.TEST_CURRENT_DATE)) ||
  new Date();

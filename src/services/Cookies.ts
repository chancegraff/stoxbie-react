import { useState } from "react";

const setItem = <P extends unknown>(
  key: string,
  value: P,
  numberOfDays: number,
) =>
{
  const now = new Date();
  const valueAsString = value
    ? JSON.stringify(value)
    : undefined;

  now.setTime(now.getTime() + (numberOfDays * 60 * 60 * 24 * 1000));
  document.cookie = `${key}=${valueAsString};     expires=${now.toUTCString()}; path=/`;
};

const getItem = <P extends unknown>(
  itemKey: string,
): P =>
{
  const allCookies = document.cookie.split("; ");
  const itemValueAsString = allCookies.reduce(
    (
      total,
      currentCookie,
    ) =>
    {
      const storedItem = currentCookie.split("=");
      const [
        storedItemKey,
        storedItemValue,
      ] = storedItem;

      return itemKey === storedItemKey
        ? decodeURIComponent(storedItemValue)
        : total;
    },
    "",
  );

  return itemValueAsString === "" || itemValueAsString === "undefined"
    ? undefined
    : JSON.parse(itemValueAsString);
};

export const useCookie = <P = undefined>(
  key: string,
  defaultValue: P,
): [P, (value: P, numberOfDays: number) => void] =>
{
  const getCookie = (): P =>
  {
    return getItem<P>(key) || defaultValue;
  };
  const [
    cookie,
    setCookie,
  ] = useState(getCookie());
  const updateCookie = (
    value: P,
    numberOfDays: number,
  ) =>
  {
    setCookie(value);
    setItem(
      key,
      value,
      numberOfDays,
    );
  };

  return [
    cookie,
    updateCookie,
  ];
};

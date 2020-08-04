import { useState } from "react";

const setItem = (
  key: string, value: string, numberOfDays: number,
) => {
  const now = new Date();

  now.setTime(
    now.getTime() + (numberOfDays * 60 * 60 * 24 * 1000),
  );

  document.cookie = `${key}=${value};     expires=${now.toUTCString()}; path=/`;
};

const getItem = (
  key: string,
) => {
  return document.cookie.split(
    "; ",
  ).reduce(
    (
      total,
      currentCookie,
    ) => {
      const item = currentCookie.split(
        "=",
      );
      const [
        storedKey,
        storedValue,
      ] = item;

      return key === storedKey
        ? decodeURIComponent(
          storedValue,
        )
        : total;
    },
    "",
  );
};

export const useCookie = (
  key: string,
  defaultValue: string,
): (string | (
    (value: any, numberOfDays: any) => void)
)[] => {
  const getCookie = () => {
    return getItem(
      key,
    ) || defaultValue;
  };
  const [
    cookie,
    setCookie,
  ] = useState(
    getCookie(),
  );
  const updateCookie = (
    value: string,
    numberOfDays: number,
  ) => {
    setCookie(
      value,
    );
    setItem(
      key,
      value,
      numberOfDays,
    );
  };
  const result = [
    cookie,
    updateCookie,
  ];

  return result;
};

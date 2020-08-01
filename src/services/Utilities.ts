import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";

export const copyPropsToChildren = (
  {
    children,
    ...props
  }: PropsWithChildren<
  unknown
>,
): React.ReactNode => Children.map(
  children,
  (
    child,
  ) => {
    if (
      isValidElement(
        child,
      )
    ) {
      return cloneElement(
        child,
        props,
      );
    }

    return child;
  },
);

export const parsePixels = (
  px: string,
): number => parseInt(
  px.replace(
    "px",
    "",
  ),
);

export const handleUnloadCreator = (
  dispatchHandlers: React.Dispatch<
    React.SetStateAction<
      | any
      | undefined
    >
  >[],
) => (): void => dispatchHandlers.forEach(
  (
    dispatch,
  ) => dispatch(
    undefined,
  ),
);

export const usePrevious = <
  P
>(
    value?: P,
  ):
  | P
  | undefined => {
  const ref = useRef<
    P
  >();

  useEffect(
    () => {
      ref.current = value;
    },
  );

  return ref.current;
};

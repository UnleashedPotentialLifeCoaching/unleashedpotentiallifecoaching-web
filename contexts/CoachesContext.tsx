import React, { createContext, useState } from 'react';
import { Coach } from 'types/Coach';

interface ContextProps {
  coaches: Coach[];
  setCoaches: (e: Coach[]) => void;
}

const defaultProps = {
  coaches: [],
  setCoaches: () => {},
};

export const CoachesContext = createContext<ContextProps>(defaultProps);

export const CoachesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [coaches, setCoaches] = useState<unknown | Coach[]>();
  const values = { coaches, setCoaches } as ContextProps;

  return (
    <CoachesContext.Provider value={values}>{children}</CoachesContext.Provider>
  );
};

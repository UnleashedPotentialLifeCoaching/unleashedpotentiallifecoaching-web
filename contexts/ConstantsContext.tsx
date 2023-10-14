import React, { createContext } from 'react';
import { ICoachFields } from 'types/contentful';
import { useGetSiteConstants } from 'utils/api';

interface ContextProps {
  banner_url: string;
  boolean_choices: {
    name: string;
    checked: boolean;
  }[];
  page_id: {
    page: string;
    id: string;
  }[];
  seo_defaults: {
    title: string;
    metaDescription: string;
  };
  service_list: {
    id: number;
    slug: string;
    service: string;
  }[];
  service_options: {
    name: string;
    checked: boolean;
  }[];
  site_title: string;
  site_navigation: {
    id: number;
    label: string;
    slug?: string;
    children?: {
      id: number;
      label: string;
      slug?: string;
      open?: boolean;
    }[];
  }[];
}

const defaultProps = {
  banner_url: '',
  boolean_choices: [
    {
      name: 'Yes',
      checked: false,
    },
  ],
  page_id: [
    {
      page: 'Home',
      id: '1',
    },
  ],
  seo_defaults: {
    title: 'seo title',
    metaDescription: 'seo description',
  },
  service_list: [
    {
      id: 1,
      slug: '/coach',
      service: 'Coaching',
    },
  ],
  service_options: [
    {
      name: 'Yes',
      checked: false,
    },
  ],
  site_title: 'site title',
  site_navigation: [
    {
      id: 1,
      label: 'Home',
      slug: '/',
      children: [
        {
          id: 1,
          label: 'Home child',
          slug: '/home/child',
          open: false,
        },
      ],
    },
  ],
};

export const ConstantsContext = createContext<ContextProps>(defaultProps);

export const ConstantsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useGetSiteConstants();

  console.log(data?.data);

  if (data) {
    return (
      <ConstantsContext.Provider value={...data?.data}>
        {children}
      </ConstantsContext.Provider>
    );
  }
};

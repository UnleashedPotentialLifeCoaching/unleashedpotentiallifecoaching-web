/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client, fql } from 'fauna';
import { FAUNA_SECRET } from 'utils/constants';

const client = new Client({
  secret: FAUNA_SECRET,
});

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const collectionExists = fql`site_constants.all()`;
    const request = await client.query(collectionExists);

    //@ts-ignore
    const requestData = request?.data?.data;

    const siteConstants = {
      banner_url: requestData.filter((item: any) =>
        Object.keys(item).includes('banner_url'),
      )[0].banner_url,
      boolean_choices: requestData.filter((item: any) =>
        Object.keys(item).includes('boolean_choices'),
      )[0].boolean_choices,
      page_ids: requestData.filter((item: any) =>
        Object.keys(item).includes('page_ids'),
      )[0].page_ids,
      service_list: requestData.filter((item: any) =>
        Object.keys(item).includes('service_list'),
      )[0].service_list,
      service_options: requestData.filter((item: any) =>
        Object.keys(item).includes('service_options'),
      )[0].service_options,
      site_navigation: requestData.filter((item: any) =>
        Object.keys(item).includes('site_navigation'),
      )[0].site_navigation,
      seo_default: requestData.filter((item: any) =>
        Object.keys(item).includes('seo_default'),
      )[0].seo_default,
      site_title: requestData.filter((item: any) =>
        Object.keys(item).includes('site_title'),
      )[0].site_title,
    };

    res.status(200).json({
      status: 200,
      message: 'Site constant variables',
      data: siteConstants,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'There was an issue!',
      data: err,
    });
  }
};

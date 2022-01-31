/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import sendSeverEmail from 'utils/email/server-handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const request = await sendSeverEmail(req.body);
    
    if (request) {
      res.status(200).json({
        status: 200,
        message: 'Email sent!',
        data: request,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'There was an issue!',
      data: err,
    });
  }
};

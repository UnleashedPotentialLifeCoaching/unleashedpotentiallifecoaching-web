import fetch from 'node-fetch';
import { Email } from 'types/Email';
const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const sendSeverEmail = async (contents: Email) => {
  const { subject, body } = contents;

  const data = {
    personalizations: [
      {
        to: [
          {
            email: process.env.TO_EMAIL_ADDRESS,
          },
        ],
        subject,
      },
    ],
    from: {
      email: 'noreply@unleashedpotentiallifecoaching.com',
      name: '<noreply@unleashedpotentiallifecoaching.com>',
    },
    content: [
      {
        type: 'text/html',
        value: body,
      },
    ],
  };

  console.log('Email:::', data);

  const request = await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((data: any) => data)
    .catch((err: any) => err);

  return request;
};

export default sendSeverEmail;

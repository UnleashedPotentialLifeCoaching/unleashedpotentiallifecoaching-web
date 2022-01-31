import { Email } from 'types/Email';

const sendClientEmail = async ({ subject, body }: Email) => {
  const request = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ subject, body }),
  })
    .then((data) => data.json())
    .catch((err) => err);

  return request;
};

export default sendClientEmail;

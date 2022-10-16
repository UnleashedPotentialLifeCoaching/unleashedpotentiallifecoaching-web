interface Email {
  body: string;
  subject: string;
  type?: string;
}

const sendClientEmail = async (props: Email) => {
  const request = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(props),
  })
    .then((data) => data.json())
    .catch((err) => err);

  return request;
};

export default sendClientEmail;

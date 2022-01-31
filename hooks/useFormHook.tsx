import { useState } from 'react';
import { ContactForm } from 'types/Contact';
import { ReviewForm } from 'types/Review';
import { contactTemplate, reviewTemplate } from 'utils/email/templates';
import sendClientEmail from 'utils/email/client-handler';
import { FAILED_EMAIL_MESSAGE, successEmailMessage } from 'utils/constants';

type Form = ReviewForm & ContactForm;

interface Email {
  subject: string;
  body: string;
}

const useFormHook = (formName: string) => {
  const [form, setForm] = useState<unknown | Form>();
  const [emailMessage, setEmailMessage] = useState<Email>({
    subject: '',
    body: '',
  });
  const [didSend, setDidSend] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');

  const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const event = e.target as HTMLFormElement;
    const value = event.value;
    const name = event.name;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const details = form as Form;
    let message = '';

    if (formName === 'review') {
      const rTemplate = reviewTemplate(details);
      setEmailMessage(rTemplate);
    }

    if (formName === 'contact') {
      const cTemplate = contactTemplate(details);
      setEmailMessage(cTemplate);
    }

    const subject = emailMessage?.subject;
    const body = emailMessage?.body;

    const request = await sendClientEmail({ subject, body });

    if (request.status === 200) {
      message = successEmailMessage(formName);

      setResponse(message);
      setDidSend(true);
    }

    if (request.status === 500) {
      message = FAILED_EMAIL_MESSAGE;

      setResponse(message);
      setDidSend(true);
    }
  };

  return [onChangeHandler, onSubmitHandler, didSend, response] as const;
};

export default useFormHook;

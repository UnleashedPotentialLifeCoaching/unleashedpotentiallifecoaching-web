import { useState } from 'react';
import {
  contactTemplate,
  reviewTemplate,
  bookingTemplate,
} from 'utils/email/templates';
import sendClientEmail from 'utils/email/client-handler';
import { FAILED_EMAIL_MESSAGE, successEmailMessage } from 'utils/constants';
import { formatDate } from 'utils/helpers';

interface ContactForm {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface ReviewForm {
  fullName: string;
  email: string;
  phone: string;
  ratings: string;
  explanation: string;
  improvements: string;
  recommend: string;
  comments: string;
}

interface BookingForm {
  fullName: string;
  email: string;
  phone: string;
  eventDate: any;
  ratings: string;
  explanation: string;
  improvements: string;
  comments: string;
  subject: string;
  message: string;
  selectCoach: string;
  previousCoaching: string;
}

type Form = ReviewForm & ContactForm & BookingForm;

const useFormHook = (formName: string) => {
  const [form, setForm] = useState<unknown | Form>();
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

    if (formName === 'review') {
      const rTemplate = reviewTemplate(details);
      handleSendClient(rTemplate.body, rTemplate.subject);
    }

    if (formName === 'contact') {
      const cTemplate = contactTemplate(details);
      handleSendClient(cTemplate.body, cTemplate.subject);
    }

    if (formName === 'book-time') {
      const bTemplate = bookingTemplate(details as BookingForm);
      handleSendClient(bTemplate.body, bTemplate.subject);
    }
  };

  const handleSendClient = async (body: string, subject: string) => {
    const request = await sendClientEmail({ subject, body });
    let message = '';

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

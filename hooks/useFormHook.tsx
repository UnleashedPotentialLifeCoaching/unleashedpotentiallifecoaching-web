import { useState } from 'react';
import { ContactForm } from 'types/Contact';
import { ReviewForm } from 'types/Review';
import { BookingForm } from 'types/Booking';
import {
  contactTemplate,
  reviewTemplate,
  bookingTemplate,
} from 'utils/email/templates';
import sendClientEmail from 'utils/email/client-handler';
import { FAILED_EMAIL_MESSAGE, successEmailMessage } from 'utils/constants';
import { convertTime, formatDate } from 'utils/helpers';

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
      const modDetails = {
        ...details,
        time: convertTime(details.time),
        date: formatDate(details.date),
      } as BookingForm;

      const bTemplate = bookingTemplate(modDetails);
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

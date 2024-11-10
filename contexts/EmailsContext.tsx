'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  contactTemplate,
  reviewTemplate,
  bookingTemplate,
} from 'utils/email/templates';
import sendClientEmail from 'utils/email/client-handler';
import { FAILED_EMAIL_MESSAGE, successEmailMessage } from 'utils/constants';
import { convertTime, formatDate } from 'utils/helpers';

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
  time: string;
  date: string;
  fullName: string;
  email: string;
  phone: string;
  ratings: string;
  explanation: string;
  improvements: string;
  comments: string;
  subject: string;
  message: string;
  selectCoach: string;
  previousCoaching: string;
}

export type Form = ContactForm | ReviewForm | BookingForm;

interface EmailsContextType {
  form: Form | null;
  didSend: boolean;
  response: string;
  emailTemplate: string;
  setForm: (form: Form) => void;
  setDidSend: (didSend: boolean) => void;
  setResponse: (response: string) => void;
  setEmailTemplate: (template: string) => void;
  resetForm: () => void;
}

const EmailsContext = createContext<EmailsContextType | undefined>(undefined);

export const useEmails = () => {
  const context = useContext(EmailsContext);
  if (context === undefined) {
    throw new Error('useEmails must be used within an EmailsProvider');
  }
  return context;
};

interface EmailsProviderProps {
  children: ReactNode;
}

function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export const EmailsProvider: React.FC<EmailsProviderProps> = ({ children }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [didSend, setDidSend] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [emailTemplate, setEmailTemplate] = useState<string>('');

  const sendClient = useCallback(
    async (body: string, subject: string) => {
      try {
        const request = await sendClientEmail({ subject, body });
        if (request?.status === 200) {
          return successEmailMessage(emailTemplate);
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        return FAILED_EMAIL_MESSAGE;
      }
    },
    [emailTemplate],
  );

  const getTemplate = useCallback((templateName: string, formData: Form) => {
    const clonedForm = deepClone(formData);
    switch (templateName) {
      case 'review':
      case 'review-form':
        return reviewTemplate(clonedForm as ReviewForm);
      case 'contact':
        return contactTemplate(clonedForm as ContactForm);
      case 'book-time':
        return bookingTemplate({
          ...clonedForm,
          time: convertTime((clonedForm as BookingForm).time),
          date: formatDate((clonedForm as BookingForm).date),
        } as BookingForm);
      default:
        throw new Error(`Unsupported email template: ${templateName}`);
    }
  }, []);

  useEffect(() => {
    if (emailTemplate && form) {
      let isMounted = true;
      const sendEmail = async () => {
        try {
          const template = getTemplate(emailTemplate, form);
          const message = await sendClient(template.body, template.subject);
          if (isMounted) {
            setResponse(message);
            setDidSend(true);
          }
        } catch (error) {
          console.error('Error in email process:', error);
          if (isMounted) {
            setResponse(FAILED_EMAIL_MESSAGE);
            setDidSend(true);
          }
        }
      };

      sendEmail();

      return () => {
        isMounted = false;
      };
    }
  }, [emailTemplate, form, getTemplate, sendClient]);

  const resetForm = useCallback(() => {
    setForm(null);
    setDidSend(false);
    setResponse('');
    setEmailTemplate('');
  }, []);

  const value = useMemo(
    () => ({
      form,
      didSend,
      response,
      emailTemplate,
      setForm,
      setDidSend,
      setResponse,
      setEmailTemplate,
      resetForm,
    }),
    [form, didSend, response, emailTemplate, resetForm],
  );

  return (
    <EmailsContext.Provider value={value}>{children}</EmailsContext.Provider>
  );
};

export default EmailsContext;

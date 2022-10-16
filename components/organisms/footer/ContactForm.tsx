import React from 'react';
import Button from 'components/atoms/Button';
import InputText from 'components/atoms/InputText';
import dynamic from 'next/dynamic';
import useFormHook from 'hooks/useFormHook';

const FormResponse = dynamic(() => import('components/atoms/FormResponse'));

const ContactForm = () => {
  const [onChangeHandler, onSubmitHandler, didSend, response] =
    useFormHook('contact');

  return (
    <div className="w-100 sm:w-1/2">
      {didSend ? (
        <FormResponse message={response} />
      ) : (
        <div className="space-y-3 sm:space-y-4 w-full">
          <form
            onSubmit={onSubmitHandler}
            onChange={onChangeHandler}
            className="space-y-3 sm:space-y-4"
          >
            <InputText
              id="full-name"
              name="fullName"
              label="Full Name"
              type="text"
            />
            <InputText id="email" name="email" label="Email" type="email" />
            <InputText id="phone" name="phone" label="Phone" type="text" />
            <InputText
              id="message"
              name="message"
              label="Message"
              type="textarea"
            />
            <Button label="Send" />
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

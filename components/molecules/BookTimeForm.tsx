import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Button from 'components/atoms/Button';
import InputRadio from 'components/atoms/InputRadio';
import InputText from 'components/atoms/InputText';
import useFormHook from 'hooks/useFormHook';

import { ConstantsContext } from 'contexts/ConstantsContext';

const FormResponse = dynamic(() => import('components/atoms/FormResponse'));

interface CoachCheck {
  name: string;
  checked: boolean;
}

interface Props {
  setOpen: (e: boolean) => void;
}

const BookTimeForm = ({ setOpen }: Props) => {
  const [onChangeHandler, onSubmitHandler, didSend, response] =
    useFormHook('book-time');
  const { boolean_choices } = useContext(ConstantsContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmitHandler(e);
  };

  return (
    <div>
      {didSend ? (
        <>
          <FormResponse message={response} />
          <div className="text-center">
            <Button handlePress={() => setOpen(false)} label="Close" />
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} onChange={onChangeHandler}>
          <InputText
            id="bt-full-name"
            name="fullName"
            label="Full Name"
            type="text"
          />
          <br />
          <InputText id="bt-email" name="email" label="Email" type="email" />
          <br />
          <InputText id="bt-phone" name="phone" label="phone" type="phone" />
          <br />
          <p>Pick a date</p>
          <InputText id="date" name="date" label="Pick a date" type="date" />
          <br />
          <p>Select a time</p>
          <InputText id="time" name="time" label="Select time" type="time" />
          <br />
          <InputText
            id="comments"
            name="comments"
            label="Anything else you would like to add?"
            type="textarea"
          />
          <br />
          <Button label="Book Time" />
        </form>
      )}
    </div>
  );
};

export default BookTimeForm;

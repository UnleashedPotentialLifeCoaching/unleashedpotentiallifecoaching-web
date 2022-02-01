import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { CoachesContext } from 'contexts/CoachesContext';
import Button from 'components/atoms/Button';
import InputRadio from 'components/atoms/InputRadio';
import InputText from 'components/atoms/InputText';
import useFormHook from 'hooks/useFormHook';
import { BOOLEAN_CHOICE } from 'utils/constants';
import { urlify } from 'utils/helpers';

const FormResponse = dynamic(() => import('components/atoms/FormResponse'));

interface CoachCheck {
  name: string;
  checked: boolean;
}

interface Props {
  setOpen: (e: boolean) => void;
}

const BookTimeForm = ({ setOpen }: Props) => {
  const [coachOptions, setCoachOptions] = useState<CoachCheck[]>([]);
  const [onChangeHandler, onSubmitHandler, didSend, response] =
    useFormHook('book-time');
  const router = useRouter();
  const { coaches } = useContext(CoachesContext);

  useEffect(() => {
    if (coachOptions.length <= 0 && coaches) {
      if (router?.query?.coach) {
        const addACheckedCoach = coaches.map(({ name }) => ({
          name,
          checked: urlify(name) === router?.query?.coach ? true : false,
        }));

        setCoachOptions(addACheckedCoach);
      } else {
        setCoachOptions(
          coaches.map(({ name }) => ({
            name,
            checked: false,
          }))
        );
      }
    }
  }, [router?.query?.coach, coaches, coachOptions.length]);

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
          <InputRadio
            label="previousCoaching"
            title="Have you been coached before?"
            options={BOOLEAN_CHOICE}
          />
          <InputRadio
            label="selectCoach"
            title="Select a coach"
            options={coachOptions}
          />
          <br />
          <p>Pick a date</p>
          <InputText id="date" name="date" label="Pick a date" type="date" />
          <br />
          <p>Select a time</p>
          <InputText id="time" name="time" label="Select time" type="time" />
          <InputRadio
            label="recommend"
            title="Would you recommend us to your friends?"
            options={BOOLEAN_CHOICE}
          />
          <InputText
            id="comments"
            name="comments"
            label="Anything else you would like to add?"
            type="textarea"
          />
          <br />
          <Button label="Submit Review" />
        </form>
      )}
    </div>
  );
};

export default BookTimeForm;

import dynamic from 'next/dynamic';
import Button from 'components/atoms/Button';
import InputRadio from 'components/atoms/InputRadio';
import InputText from 'components/atoms/InputText';
import useFormHook from 'hooks/useFormHook';
import { useContext } from 'react';
import { ConstantsContext } from 'contexts/ConstantsContext';

const FormResponse = dynamic(() => import('components/atoms/FormResponse'));

const ReviewForm = () => {
  const [onChangeHandler, onSubmitHandler, didSend, response] =
    useFormHook('review');
  const { boolean_choices, service_options } = useContext(ConstantsContext);
  return (
    <>
      {didSend ? (
        <FormResponse message={response} />
      ) : (
        <form onSubmit={onSubmitHandler} onChange={onChangeHandler}>
          <InputText
            id="review-full-name"
            name="fullName"
            label="Full Name"
            type="text"
          />
          <br />
          <InputText
            id="review-email"
            name="email"
            label="Email"
            type="email"
          />
          <br />
          <InputText
            id="review-phone"
            name="phone"
            label="Phone"
            type="phone"
          />
          <InputRadio
            label="ratings"
            title="Rate Our Services"
            options={service_options}
          />
          <InputText
            id="explanation"
            name="explanation"
            label="What did you like best?"
            type="textarea"
          />
          <br />
          <InputText
            id="improvements"
            name="improvements"
            label="How can we improve?"
            type="textarea"
          />
          <InputRadio
            label="recommend"
            title="Would you recommend us to your friends?"
            options={boolean_choices}
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
    </>
  );
};

export default ReviewForm;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEmails, Form as EmailsForm } from 'contexts/EmailsContext';
import Button from 'components/atoms/Button';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format')
    .required('Time is required'),
  comments: Yup.string(),
});

const BookTimeForm = () => {
  const { setForm, setDidSend, setEmailTemplate } = useEmails();

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    comments: '',
  };

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      setForm(values as EmailsForm);
      setDidSend(true);
      setEmailTemplate('book-time');
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forrest-300 focus:ring focus:ring-forrest-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forrest-300 focus:ring focus:ring-forrest-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forrest-300 focus:ring focus:ring-forrest-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Pick a date
              </label>
              <Field
                id="date"
                name="date"
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forrest-300 focus:ring focus:ring-forrest-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="date"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Select a time
              </label>
              <Field
                id="time"
                name="time"
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forrest-300 focus:ring focus:ring-forrest-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="time"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700"
              >
                Anything else you would like to add?
              </label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forrest-300 focus:ring focus:ring-forrest-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="comments"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <Button
                disabled={isSubmitting}
                label={isSubmitting ? 'Submitting...' : 'Book Time'}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookTimeForm;

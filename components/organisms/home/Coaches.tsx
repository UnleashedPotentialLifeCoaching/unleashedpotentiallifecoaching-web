import CoachCard from 'components/molecules/CoachCard';
import React from 'react';
import { Coach } from 'types/Coach';

interface Props {
  coaches: Coach[];
}
const Coaches = ({ coaches }: Props) => {
  return (
    <div className="bg-forrest py-12">
      <p className="text-white font-serif italic font-bold text-center text-5xl mb-24">
        Take the first step
      </p>
      <div className="flex flex-col justify-center items-center xl:flex-row 2xl:justify-evenly my-82">
        {coaches.map((coach) => (
          <CoachCard key={coach.id} {...coach} />
        ))}
      </div>
    </div>
  );
};

export default Coaches;

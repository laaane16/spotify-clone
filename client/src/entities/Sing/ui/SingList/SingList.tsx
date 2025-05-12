import { FC } from 'react';
import { SingSchema } from '../../model/types/SingSchema';
import SingCard from '../SingCard/SingCard';

interface Props {
  data: SingSchema[];
  className?: string;
}

const SingList: FC<Props> = ({ data }) => {
  return (
    <ul>
      {data.map((sing) => (
        <li key={sing.id}>
          <SingCard data={sing} />
        </li>
      ))}
    </ul>
  );
};

export default SingList;

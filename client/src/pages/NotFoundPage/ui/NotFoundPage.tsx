import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getHomeRoute } from '@/shared/configs';

interface Props {
  className?: string;
}

const NotFoundPage: FC<Props> = (props) => (
  <>
    <div>404 not found</div>
    <Link style={{ color: 'black' }} to={getHomeRoute()}>
      Go to main page
    </Link>
  </>
);

export default NotFoundPage;

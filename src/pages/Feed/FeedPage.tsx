import { FC, useEffect } from 'react';
import {
  PageContainer,
  FeedHeader,
  FeedInfo,
  FeedList,
} from '@components/index';
import { wsOnConnecting, wsOnClose } from '@shared/services/reducers/feedSlice';
import { useAppDispatch } from '@shared/services/hooks';
import classes from './feedPage.module.css';

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className={classes.feed}>
      <FeedHeader />
      <div className={classes.feed__content}>
        <FeedList />
        <FeedInfo />
      </div>
    </PageContainer>
  );
};

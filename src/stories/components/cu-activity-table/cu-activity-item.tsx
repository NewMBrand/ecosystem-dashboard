import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CuActivityDto } from '../../../core/models/dto/core-unit-activity.dto';
import { CustomButton } from '../custom-button/custom-button';

interface CUActivityItemProps {
  activity: CuActivityDto;
  isNew: boolean;
}
export default function CUActivityItem({ activity, isNew }: CUActivityItemProps) {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();

  const dayDiffNow = useMemo(
    () => Math.abs(Math.ceil(DateTime.fromMillis(parseInt(activity.updateDate ?? '')).diffNow('days').days)),
    [activity]
  );

  return (
    <Link href={activity.updateUrl || ''} passHref>
      <ActivityItem isLight={isLight}>
        <Timestamp>
          <UTCDate isLight={isLight}>
            {DateTime.fromMillis(parseInt(activity.updateDate ?? ''))
              .setZone('UTC')
              .toFormat('dd-LLL-y HH:hh ZZZZ')}
          </UTCDate>
          <HumanizedDate isLight={isLight} isNew={isNew}>
            {dayDiffNow === 0 ? 'Today' : `${dayDiffNow} Day${dayDiffNow !== 1 ? 's' : ''} Ago`}
          </HumanizedDate>
        </Timestamp>
        <Details isLight={isLight}>{activity.updateTitle}</Details>
        <ButtonContainer>
          <CustomButton
            label="View Details"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              router.push(activity.updateUrl || '');
            }}
            style={{
              display: 'inline-flex',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              padding: '8px 24px',
              height: 'auto',
              color: '#231536',
              border: '1px solid #25273D',
            }}
          />
        </ButtonContainer>
      </ActivityItem>
    </Link>
  );
}

const ActivityItem = styled.a<{ isLight: boolean; isLoading?: boolean }>(({ isLight, isLoading }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  background: isLight ? 'white' : '#10191F',
  marginTop: '16px',
  padding: '16px 16px 24px',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  ':hover': {
    background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: '24px 32px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '24px 64px',
  },
}));

const Timestamp = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '34px',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    width: 230,
    paddingRight: 14,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 339 - 64,
  },
});

const Details = styled.div<{ isLight: boolean }>(({ isLight = true }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#EDEFFF',
  marginBottom: '32px',
  letterSpacing: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'calc(100% - 230px)',
    fontSize: '16px',
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'calc(100% - 275px)',
  },
}));

const UTCDate = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: isLight ? '#708390' : '#546978',

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: '4px',
  },
}));

const HumanizedDate = styled.div<{ isLight: boolean; isNew: boolean }>(({ isLight = true, isNew = false }) => ({
  position: 'relative',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#EDEFFF',

  ...(isNew && {
    paddingRight: '10px',

    [lightTheme.breakpoints.up('table_834')]: {
      paddingLeft: '10px',
    },

    '&::before': {
      content: '""',
      display: 'block',
      width: '6px',
      height: '6px',
      background: isLight ? '#F75524' : '#FF8237',
      borderRadius: '50%',
      position: 'absolute',
      right: 0,
      top: '5.5px',

      [lightTheme.breakpoints.up('table_834')]: {
        left: 0,
      },
    },
  }),
}));

const ButtonContainer = styled.div({
  textAlign: 'right',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

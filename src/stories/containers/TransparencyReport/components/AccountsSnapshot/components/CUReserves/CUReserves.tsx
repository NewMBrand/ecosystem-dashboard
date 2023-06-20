import styled from '@emotion/styled';
import CheckboxMui from '@mui/material/Checkbox';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import FundChangeCard from '../Cards/FundChangeCard';
import ReserveCard from '../Cards/ReserveCard';
import SimpleStatCard from '../Cards/SimpleStatCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import type { SnapshotAccountBalance, UIReservesData } from '@ses/core/models/dto/snapshotAccountDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CUReservesProps {
  snapshotOwner?: string;
  includeOffChain: boolean;
  toggleIncludeOffChain: () => void;
  startDate?: string;
  endDate?: string;
  balance?: SnapshotAccountBalance;
  onChainData?: UIReservesData[];
}

const CUReserves: React.FC<CUReservesProps> = ({
  snapshotOwner,
  includeOffChain,
  toggleIncludeOffChain,
  startDate,
  endDate,
  balance,
  onChainData,
}) => {
  const { isLight } = useThemeContext();

  return (
    <div>
      <HeaderContainer>
        <SectionHeader
          title="Total Core Unit Reserves"
          subtitle={`On-chain and off-chain reserves accessible${snapshotOwner ? ` to the ${snapshotOwner}` : ''}.`}
          tooltip={'pending...'}
        />
        <CheckContainer isLight={isLight}>
          Include Off-Chain Reserves{' '}
          <Checkbox checked={includeOffChain} onChange={toggleIncludeOffChain} isLight={isLight} size="small" />
        </CheckContainer>
      </HeaderContainer>

      <CardsContainer>
        <SimpleStatCard date={startDate} value={balance?.initialBalance} caption="Initial Core Unit Reserves" />
        <FundChangeCard
          netChange={balance?.inflow && balance?.outflow ? balance.outflow - balance.inflow * -1 : undefined}
          leftValue={balance?.inflow}
          leftText="Inflow"
          rightValue={balance?.outflow ? balance?.outflow * -1 : undefined}
          rightText="Outflow"
        />
        <SimpleStatCard
          date={endDate}
          value={balance?.newBalance}
          caption="New Core Unit Reserves"
          hasEqualSign
          isReserves
        />
      </CardsContainer>

      <OnChainSubsection>
        <SectionHeader
          title="On Chain Reserves"
          subtitle={`Unspent on-chain reserves${snapshotOwner ? ` to the ${snapshotOwner}` : ''}.`}
          tooltip={'pending...'}
          isSubsection
        />

        <ReservesCardsContainer>
          {onChainData?.map((account) => (
            <ReserveCard key={account.id} account={account} />
          ))}
        </ReservesCardsContainer>
      </OnChainSubsection>

      <OffChainSubsection isDisabled={!includeOffChain}>
        <SectionHeader
          title="Off Chain Reserves"
          subtitle={`Unspent off-chain reserves${snapshotOwner ? ` to the ${snapshotOwner}` : ''}.`}
          tooltip={'pending...'}
          isSubsection
        />

        <ReservesCardsContainer>
          <ReserveCard
            account={
              {
                accountLabel: 'Payment Processor',
                accountType: 'group',
                snapshotAccountBalance: [
                  {
                    initialBalance: 100000,
                    inflow: 300000,
                    outflow: -300000,
                    newBalance: 0,
                  },
                ],
                groups: [],
              } as unknown as UIReservesData
            }
          />
          <ReserveCard
            account={
              {
                // temporary disable as this is a WIP
                // eslint-disable-next-line spellcheck/spell-checker
                accountLabel: 'Coinbase Account',
                accountType: 'group',
                snapshotAccountBalance: [
                  {
                    initialBalance: 500000,
                    inflow: 300000,
                    outflow: -250000,
                    newBalance: 550680,
                  },
                ],
                groups: [],
              } as unknown as UIReservesData
            }
          />
        </ReservesCardsContainer>
      </OffChainSubsection>
    </div>
  );
};

export default CUReserves;

const CardsContainer = styled.div({
  display: 'flex',
  gap: 8,
  marginTop: 24,
  flexWrap: 'wrap',

  '& > div:nth-of-type(1)': {
    order: 1,
    width: 'calc(50% - 4px)',
  },
  '& > div:nth-of-type(2)': {
    order: 3,
  },
  '& > div:nth-of-type(3)': {
    order: 2,
    width: 'calc(50% - 4px)',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    flexWrap: 'nowrap',

    '& > div:nth-of-type(1)': {
      order: 1,
      width: '100%',
    },
    '& > div:nth-of-type(2)': {
      order: 2,
    },
    '& > div:nth-of-type(3)': {
      order: 3,
      width: '100%',
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 24,
  },
});

const HeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'flex-end',
  },
});

const CheckContainer = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#787A9B',
  display: 'flex',
  marginRight: 2,
  marginBottom: 1,
  gap: 10,
  marginTop: 20,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 4,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },

  '& span': {
    padding: 0,
  },
}));

const Checkbox = styled(CheckboxMui)<WithIsLight>(({ isLight }) => ({
  svg: {
    fill: isLight ? '#231536' : '#ADAFD4',
  },
}));

const OnChainSubsection = styled.div({
  marginTop: 24,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 23,
  },
});

const OffChainSubsection = styled.div<{ isDisabled?: boolean }>(({ isDisabled = false }) => ({
  marginTop: 16,
  opacity: isDisabled ? 0.3 : 1,
}));

const ReservesCardsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
});

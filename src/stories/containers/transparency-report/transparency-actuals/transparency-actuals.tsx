import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { DateTime } from 'luxon';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useTransparencyActualsMvvm } from './transparency-actuals.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { TransparencyCard } from '../../../components/transparency-card/transparency-card';

interface TransparencyActualsProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
  code: string;
}
export const TransparencyActuals = (props: TransparencyActualsProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);

  const {
    currentBudgetStatement,
    getWalletForecast,
    getWalletActual,
    getWalletDifference,
    getWalletPayment,
    budgetTotalForecast,
    budgetTotalActual,
    budgetTotalDifference,
    budgetTotalPayment,
    getGroupForecast,
    getGroupActual,
    getGroupDifference,
    getGroupPayment,
    getCommentsFromCategory,
    breakdownHeaders,
    wallets
  } = useTransparencyActualsMvvm(thirdIndex, setThirdIndex, props.currentMonth, props.budgetStatements, props.code);

  const mainTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (currentBudgetStatement) {
      wallets.forEach(wallet => {
        result.push([
          <WalletTableCell key={1} name={wallet.name} wallet={formatAddressForOutput(wallet.address)} address={wallet.address}/>,
          <NumberCell key={2} value={getWalletForecast(wallet)}/>,
          <NumberCell key={3} value={getWalletActual(wallet)}/>,
          <NumberCell key={3} value={getWalletDifference(wallet)}/>,
          <NumberCell key={5} value={getWalletPayment(wallet)}/>,
          <TableCell key={6}>
            <CustomLink fontFamily={'SF Pro Display, sans-serif'} fontSize={16} href={`https://etherscan.io/address/${wallet.address}`} style={{ marginRight: '16px' }}>Etherscan</CustomLink>
            <CustomLink fontFamily={'SF Pro Display, sans-serif'} fontSize={16} href={`https://gnosis-safe.io/app/eth:${wallet.address}`}>Gnosis</CustomLink>
          </TableCell>
        ]);
      });

      result.push([
        <TableCell key={1}><b>Total</b></TableCell>,
        <NumberCell key={2} value={budgetTotalForecast} bold/>,
        <NumberCell key={3} value={budgetTotalActual} bold/>,
        <NumberCell key={4} value={budgetTotalDifference} bold/>,
        <NumberCell key={5} value={budgetTotalPayment} bold/>,
        <TableCell key={6}/>,
      ]);
    }

    return result;
  }, [currentBudgetStatement]);

  const mainTableCards = useMemo(() => {
    return <>
      {wallets.map(wallet => <TransparencyCard
        header={<WalletTableCell key={1} name={wallet.name} wallet={formatAddressForOutput(wallet.address)} address={wallet.address}/>}
        headers={['Forecast', 'Actuals', 'Difference', 'Payments']}
        items={[<NumberCell key={2} value={getWalletForecast(wallet)}/>,
          <NumberCell key={3} value={getWalletActual(wallet)}/>,
          <NumberCell key={3} value={getWalletDifference(wallet)}/>,
          <NumberCell key={5} value={getWalletPayment(wallet)}/>]}
        footer={<>
          <CustomLink fontFamily={'SF Pro Display, sans-serif'} fontSize={16} href={`https://etherscan.io/address/${wallet.address}`} style={{ marginRight: '16px' }}>Etherscan</CustomLink>
          <CustomLink fontFamily={'SF Pro Display, sans-serif'} fontSize={16} href={`https://gnosis-safe.io/app/eth:${wallet.address}`}>Gnosis</CustomLink>
        </>}
      />)}
      <TransparencyCard
        header={<TableCell><b>Total</b></TableCell>}
        headers={['Forecast', 'Actuals', 'Difference', 'Payments']}
        items={[
          <NumberCell key={2} value={budgetTotalForecast} bold/>,
          <NumberCell key={3} value={budgetTotalActual} bold/>,
          <NumberCell key={4} value={budgetTotalDifference} bold/>,
          <NumberCell key={5} value={budgetTotalPayment} bold/>,
        ]}
      />
    </>;
  }, [currentBudgetStatement]);

  const getBreakdownItems = (items: BudgetStatementLineItemDto[]) => {
    const result: JSX.Element[][] = [];
    const grouped = _.groupBy(items, item => item.budgetCategory);

    for (const groupedKey in grouped) {
      if (Math.abs(getGroupForecast(grouped[groupedKey])) + Math.abs(getGroupActual(grouped[groupedKey])) + Math.abs(getGroupDifference(grouped[groupedKey])) === 0) {
        continue;
      }

      result.push([
        <TableCell key={1}>{grouped[groupedKey][0].budgetCategory}</TableCell>,
        <NumberCell key={2} value={getGroupForecast(grouped[groupedKey])}/>,
        <NumberCell key={3} value={getGroupActual(grouped[groupedKey])}/>,
        <NumberCell key={4} value={getGroupDifference(grouped[groupedKey])}/>,
        <TableCell key={5}>{getCommentsFromCategory(grouped[groupedKey])}</TableCell>,
        <NumberCell key={6} value={getGroupPayment(grouped[groupedKey])}/>
      ]);
    }

    return result;
  };

  const breakdownTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (!wallets) {
      return result;
    }

    const currentWallet = wallets[thirdIndex];

    result.push([
      <TableCell key={1}><b>Headcount Expenses</b></TableCell>,
    ]);

    result.push(...getBreakdownItems(currentWallet?.budgetStatementLineItem?.filter(item => item.headcountExpense)));

    result.push([
      <TableCell key={1}><b>Non-Headcount Expenses</b></TableCell>,
    ]);

    result.push(...getBreakdownItems(currentWallet?.budgetStatementLineItem?.filter(item => !item.headcountExpense)));

    result.push([
      <TableCell key={1}><b>Total</b></TableCell>,
      <NumberCell key={2} value={getWalletForecast(currentWallet)} bold/>,
      <NumberCell key={3} value={getWalletActual(currentWallet)} bold/>,
      <NumberCell key={4} value={getWalletDifference(currentWallet)} bold/>,
      <TableCell key={5} />,
      <NumberCell key={6} value={getWalletPayment(currentWallet)} bold/>,
    ]);

    return result;
  }, [currentBudgetStatement, thirdIndex]);

  const breakdownCardItems = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return <>
      <Title fontSize="14px">Headcount Expenses</Title>
      {getBreakdownItems(currentWallet?.budgetStatementLineItem?.filter(item => item.headcountExpense)).map(item => <TransparencyCard
        header={item[0]}
        headers={['Forecast', 'Actuals', 'Difference', 'Diff. Reason']}
        items={item.slice(1)}
      />)}
      <Title fontSize="14px">Non-Headcount Expenses</Title>
      {getBreakdownItems(currentWallet?.budgetStatementLineItem?.filter(item => !item.headcountExpense)).map(item => <TransparencyCard
        header={item[0]}
        headers={['Forecast', 'Actuals', 'Difference', 'Diff. Reason']}
        items={item.slice(1)}
      />)}
    </>;
  }, [currentBudgetStatement, thirdIndex]);

  return <Container>
    {!!mainTableItems.length && <>
      <Title>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>

      <TableWrapper>
        <InnerTable
          headers={['Budget', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
          items={mainTableItems}
          headersAlign={['left', 'right', 'right', 'right', 'right', 'left']}
          minWidth={120}
          headerWidths={['234px', '160px', '160px', '160px', '160px', '310px']}
          style={{ marginBottom: '64px' }}
          />
      </TableWrapper>

      <CardsWrapper>
        {mainTableCards}
      </CardsWrapper>
    </>}

    {!!mainTableItems.length && <>
      <Title>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      <Tabs
        items={breakdownHeaders}
        currentIndex={thirdIndex}
        onChange={setThirdIndex}
        style={{
          marginBottom: '32px',
        }}
      />

      <TableWrapper>
        <InnerTable
          headers={['Budget Category', 'Forecast', 'Actuals', 'Difference', 'Diff. Reason', 'Payments']}
          items={breakdownTableItems}
          headerWidths={['260px', '160px', '160px', '160px', '286px', '158px']}
          headersAlign={['left', 'right', 'right', 'right', 'left', 'right']}
          minWidth={100}
        />
      </TableWrapper>

      <CardsWrapper>
        {breakdownCardItems}
      </CardsWrapper>
    </>}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 835px)': {
    display: 'block'
  }
});

const CardsWrapper = styled.div({
  display: 'block',
  '@media (min-width: 835px)': {
    display: 'none'
  }
});

const Title = styled.div<{ fontSize?: string }>(({ fontSize = '16px' }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontStyle: 'normal',
  fontSize,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#231536',
  marginBottom: '16px',
  '@media (min-width: 835px)': {
    fontSize: '20px',
    marginBottom: '24px',
  }
}));

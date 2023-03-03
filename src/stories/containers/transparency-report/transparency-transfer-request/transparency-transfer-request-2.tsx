import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';
import { getShortCode } from '../../../../core/utils/string.utils';
import { AdvancedInnerTable } from '../../../components/advanced-inner-table/advanced-inner-table';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { LinkDescription } from '../transparency-actuals/transparency-actuals';
import { useTransparencyTransferRequestMvvm2 } from './transparency-transfer-request-2.mvvm';
import type { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyTransferRequest2 = (props: Props) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const { mainTableColumns, mainTableItems } = useTransparencyTransferRequestMvvm2(
    props.currentMonth,
    props.budgetStatements
  );

  return (
    <Container>
      <LinkDescription isLight={isLight}>
        <span> Visit makerburn.com to</span>
        <CustomLink
          href={`${MAKER_BURN_LINK}/${props.longCode}`}
          style={{
            flexWrap: 'wrap',
            color: '#447AFB',
            letterSpacing: '0.3px',
            lineHeight: '18px',
            marginBottom: isMobile ? '0px' : '32px',
            whiteSpace: 'break-spaces',
            display: 'inline-block',
            marginLeft: 0,
          }}
          fontSize={16}
          fontWeight={500}
          iconWidth={10}
          iconHeight={10}
          marginLeft="7px"
        >
          {`view the ${getShortCode(props.code)} Core Unit on-chain transaction history`}
        </CustomLink>
      </LinkDescription>
      <div style={{ marginTop: 32 }}>
        <AdvancedInnerTable
          columns={mainTableColumns}
          items={mainTableItems}
          style={{ marginBottom: '64px' }}
          cardsTotalPosition={'top'}
          longCode={props.longCode}
        />
      </div>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

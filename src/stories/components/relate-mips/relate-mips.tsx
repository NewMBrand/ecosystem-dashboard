import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuMip } from '../../containers/cu-about/cu-about.api';
import ExternalLinkArrow from '../svg/external-link-arrow';
import { getMipTitle } from '../../../core/utils/string.utils';
import { getMipsStatus } from '../../../core/business-logic/core-unit-about';
import { CuMipDto } from '../../../core/models/dto/core-unit.dto';

export type RelateMipType = {
  status: CuStatusEnum,
  statusModified: Date,
  mipTitle?: string
  href: string
}

interface Props {
  relateMips: CuMip | CuMipDto
}

const RelateMips = ({ relateMips }: Props) => {
  const mips = getMipsStatus(relateMips || '');
  const mipStatus = relateMips.mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
  const pieces = getMipTitle(relateMips.mipTitle);
  return (
    <Content>
      <Row>
        {mipStatus && <StatusChip status={mipStatus as CuStatusEnum} />}
        {newDate && <CustomPopover
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          <SinceDate
            href={relateMips.mipUrl}
            target="_blank"
            onClick={(evt) => evt.stopPropagation()}
          >
            Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}
          </SinceDate>
        </CustomPopover>}
      </Row>
      {pieces.length === 2 && <RowUnderLine>
        <StyleMipNumber>{`${pieces[0]}:`}</StyleMipNumber>
        <ContainerIconTypography>
          <StyleTitle >{pieces[1]}</StyleTitle>
          <ArrowLinkContainer>
            <ExternalLinkArrow href={`${relateMips.mipUrl}` || '#'} />
          </ArrowLinkContainer>
        </ContainerIconTypography>
      </RowUnderLine>}
      {pieces.length === 1 && <RowUnderLine><Typography color='#447AFB' fontFamily={'SF Pro Display, sans-serif'}> {relateMips.mipTitle}</Typography><ArrowLinkContainer>  <ExternalLinkArrow href={`${relateMips.mipUrl}` || '#'} /></ArrowLinkContainer></RowUnderLine>}
    </Content>
  );
};
export default RelateMips;
const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  width: '620px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
});

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginBottom: '32px',
});

const RowUnderLine = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
});

const SinceDate = styled.a({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  textDecoration: 'none',
  marginLeft: '4px',
});

const ArrowLinkContainer = styled.span({
  display: 'inline',
  marginLeft: '9px',
});

const ContainerIconTypography = styled.div({
  display: 'inline',
  alignItems: 'center',
});

const StyleMipNumber = styled(Typography)({
  fontSize: '16px',
  minWidth: '135px',
  display: 'inline-block',
  marginRight: '4px',
  fontFamily: 'SF Pro Text, sans-serif',
  color: '#231536',
  fontWeight: 600,
  paddingTop: '3px',
  lineHeight: '22px'
});

const StyleTitle = styled(Typography)({
  color: '#447AFB',
  fontSize: '16px',
  display: 'inline',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontWeight: 500,
  fontFamily: 'SF Pro Display, sans-serif',
});

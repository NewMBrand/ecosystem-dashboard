import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import MobileDetect from 'mobile-detect';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import ModalSheetValueContent from '../TransparencyTransferRequest/components/ModalSheet/ModalSheetValueContent';
import HeaderToolTip from './TooltipHeader';
import type { WithIsLightAndClick } from '../../transparencyReportUtils';

interface Props {
  description: string;
  mipNumber: string;
  link: string;
  name: string;
  title: string;
}

type PopoverActions = {
  type: 'notSpaceDown' | 'NotSpaceRight' | 'NotDownRight' | undefined;
  payload?: boolean;
};

interface PopoverPosition {
  marginTopPopoverPosition: boolean;
  hasNotSpaceRight: boolean;
  hasNotDownRight: boolean;
}

const InitialState = {
  marginTopPopoverPosition: false,
  hasNotSpaceRight: false,
  hasNotDownRight: false,
} as PopoverPosition;

const updatePositionPopoverReducer = (state: PopoverPosition, action: PopoverActions): PopoverPosition => {
  const { type, payload } = action;
  switch (type) {
    case 'notSpaceDown':
      return {
        ...state,
        marginTopPopoverPosition: payload || false,
      };
    case 'NotSpaceRight':
      return {
        ...state,
        hasNotDownRight: true,
      };
    case 'NotDownRight':
      return {
        ...state,
        hasNotDownRight: true,
      };
    default:
      return state;
  }
};

const HeaderWithIcon: React.FC<Props> = ({ title, description, mipNumber, link, name }) => {
  const showPopover = !!(name && mipNumber && link);
  const refElementShowPopover = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout>();
  const [isOpen, setIsOpen] = useState(false);
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const { lockScroll, unlockScroll } = useScrollLock();
  const { isLight } = useThemeContext();
  const [state, dispatch] = useReducer(updatePositionPopoverReducer, InitialState);

  const handleShowPopoverWhenNotSpace = (value: boolean) => {
    dispatch({
      type: 'notSpaceDown',
      payload: value,
    });
  };
  const handleNotSpaceRight = (value: string) => {
    if (value === 'arrowUp') {
      dispatch({
        type: 'NotSpaceRight',
      });
    }
    if (value === 'arrowDown') {
      dispatch({
        type: 'NotDownRight',
        payload: state.marginTopPopoverPosition,
      });
    }
  };
  const handleClose = () => {
    clearTimeout(leaveTimeoutRef.current);
    dispatch({
      type: undefined,
    });
  };
  useEffect(() => {
    clearTimeout(leaveTimeoutRef.current);
  }, []);

  let md;
  if (typeof window !== 'undefined') {
    md = new MobileDetect(window.navigator?.userAgent);
  }

  const isMobileDevice = !!md?.mobile();

  useEffect(() => {
    if (isMobileDevice) {
      if (isOpen) {
        const pageWrapper = getPageWrapper();
        if (pageWrapper) {
          pageWrapper.style.overflow = 'hidden';
        }

        lockScroll();
      }
    }
    return () => {
      unlockScroll();
    };
  }, [isMobileDevice, isOpen, lockScroll, unlockScroll]);

  const handleOnClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <Container>
      {!isMobileResolution && (
        <>
          <Title style={{ marginRight: 8 }}>{title}</Title>
          {showPopover && (
            <ExtendedCustomPopover
              hasNotDownRight={state.hasNotDownRight}
              marginTopPopoverPosition={state.marginTopPopoverPosition}
              onClose={handleClose}
              alignArrow={state.hasNotSpaceRight || state.hasNotDownRight ? 'right' : undefined}
              handleNotSpaceRight={handleNotSpaceRight}
              hasNotSpaceRight={state.hasNotSpaceRight}
              handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
              refElementShowPopover={refElementShowPopover}
              widthArrow
              id="information"
              popupStyle={{
                padding: 10,
              }}
              title={<HeaderToolTip description={description} link={link} mipNumber={mipNumber} name={name} />}
              leaveOnChildrenMouseOut
            >
              <ContainerInfoIcon className="advance-table--transparency-card_icon_hidden" onClick={handleOnClick}>
                <IconPosition />
              </ContainerInfoIcon>
            </ExtendedCustomPopover>
          )}
        </>
      )}
      {isMobileResolution && !isMobileDevice && (
        <>
          <Title style={{ marginRight: 8 }}>{title}</Title>
          {showPopover && (
            <ExtendedCustomPopoverMobile
              hasNotDownRight={state.hasNotDownRight}
              marginTopPopoverPosition={state.marginTopPopoverPosition}
              onClose={handleClose}
              alignArrow={'center'}
              handleNotSpaceRight={handleNotSpaceRight}
              hasNotSpaceRight={state.hasNotSpaceRight}
              handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
              refElementShowPopover={refElementShowPopover}
              widthArrow
              id="information"
              popupStyle={{
                padding: 10,
              }}
              title={<HeaderToolTip description={description} link={link} mipNumber={mipNumber} name={name} />}
              leaveOnChildrenMouseOut
            >
              <ContainerInfoIcon className="advance-table--transparency-card_icon_hidden" onClick={handleOnClick}>
                <IconPosition />
              </ContainerInfoIcon>
            </ExtendedCustomPopoverMobile>
          )}
        </>
      )}
      {isMobileResolution && isMobileDevice && (
        <>
          <Title style={{ marginRight: 8 }}>{title}</Title>
          <ContainerInfoIcon className="advance-table--transparency-card_icon_hidden" onClick={handleOnClick}>
            <IconPosition />
          </ContainerInfoIcon>
        </>
      )}
      {isMobileResolution && isOpen && isMobileDevice && (
        <ModalSheet>
          <ModalSheetValueContent
            toolTipData={{
              description,
              link,
              mipNumber,
            }}
            name={name}
          />
        </ModalSheet>
      )}
      {isMobileResolution && isOpen && isMobileDevice && <ContainerOverlay isLight={isLight} onClick={handleOnClick} />}
    </Container>
  );
};

export default HeaderWithIcon;

const ExtendedCustomPopover = styled(CustomPopover)<{
  hasNotDownRight: boolean;
  hasNotSpaceRight?: boolean;
  marginTopPopoverPosition?: boolean;
}>(({ hasNotSpaceRight, marginTopPopoverPosition, hasNotDownRight }) => ({
  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
    overflowX: 'unset',
    overflowY: 'unset',
    marginLeft: -45,
    marginTop: marginTopPopoverPosition ? 16 : -25,
    ...(hasNotSpaceRight && {
      marginLeft: 45,
      marginTop: 15,
    }),
    ...(hasNotDownRight && {
      marginLeft: 45,
      marginTop: marginTopPopoverPosition ? 16 : -22,
    }),
  },
}));

const ExtendedCustomPopoverMobile = styled(ExtendedCustomPopover)({
  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
    [lightTheme.breakpoints.down('table_834')]: {
      left: '0px!important',
      marginLeft: -4,
    },
  },
});

export const ContainerInfoIcon = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const IconPosition = styled(Information)({
  display: 'flex',
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'center',
  },
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 106,
  [lightTheme.breakpoints.up('table_834')]: {
    justifyContent: 'flex-end',
    width: '100%',
  },
});

const Title = styled.div({});

const ModalSheet = styled.div({
  width: '100%',
  zIndex: 5,
  textAlign: 'left',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const ContainerOverlay = styled.div<WithIsLightAndClick>(({ isLight, onClick }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1);',
  backdropFilter: isLight ? 'blur(2px)' : 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
  cursor: onClick ? 'default' : undefined,
}));

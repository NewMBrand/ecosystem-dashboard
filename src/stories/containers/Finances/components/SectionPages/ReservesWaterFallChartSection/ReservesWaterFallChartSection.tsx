import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ReservesWaterFallFilters from '../../ReservesWaterFallFilters/ReservesWaterFallFilters';
import TitleToolTipArrowLink from '../../TitleToolTipArrowLink/TitleToolTipArrowLink';
import WaterFallChart from '../../WaterFallChart/WaterFallChart';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterFall, WaterFallChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  legends: LegendItemsWaterFall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: WaterFallChartSeriesData[];
  activeItems: string[];
  handleSelectChangeItem: (value: string[]) => void;
  popupContainerHeight: number;
  items: MultiSelectItem[];
  handleGranularityChange: (value: AnalyticGranularity) => void;
  handleResetFilter: () => void;
}
const ReservesWaterFallChartSection: React.FC<Props> = ({
  title,
  legends,
  selectedGranularity,
  series,
  year,
  activeItems,
  handleSelectChangeItem,
  items,
  popupContainerHeight,
  handleGranularityChange,
  handleResetFilter,
}) => (
  <Container>
    <ContainerTitleFilter>
      <TitleToolTipArrowLink title={title} />
      <Filters>
        <ReservesWaterFallFilters
          activeItems={activeItems}
          handleSelectChangeItem={handleSelectChangeItem}
          handleGranularityChange={handleGranularityChange}
          handleResetFilter={handleResetFilter}
          selectedGranularity={selectedGranularity}
          items={items}
          popupContainerHeight={popupContainerHeight}
          isDisabled={activeItems.length <= 0}
        />
      </Filters>
    </ContainerTitleFilter>
    <ContainerChart>
      <WaterFallChart legends={legends} year={year} selectedGranularity={selectedGranularity} series={series} />
    </ContainerChart>
  </Container>
);

export default ReservesWaterFallChartSection;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const ContainerTitleFilter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 22,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 'revert',
  },
});

const ContainerChart = styled.div({});

const Filters = styled.div({
  height: 34,
  zIndex: 3,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 48,
  },
});

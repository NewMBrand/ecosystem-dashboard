import React from 'react';
import { AuditStatusEnum } from '../../../core/enums/audit-status.enum';
import { AuditStatusChip } from './audit-status-chip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/AuditStatusChip',
  component: AuditStatusChip,
} as ComponentMeta<typeof AuditStatusChip>;

const Template: ComponentStory<typeof AuditStatusChip> = (args) => <AuditStatusChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: AuditStatusEnum.Approved,
};

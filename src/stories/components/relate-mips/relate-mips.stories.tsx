import React from 'react';
import RelateMips, { RelateMipsCuAbout } from './relate-mips';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/RelateMips',
  component: RelateMips
} as ComponentMeta<typeof RelateMips>;

const Template: ComponentStory<typeof RelateMips> = (args) => <RelateMips {...args} />;
export const WithData = Template.bind({});
WithData.args = {
  relateMips: {
    mipTitle: 'MIP39c2-SP10: Adding Sustainable Ecosystem Scaling Core Unit',
    mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
    mipStatus: 'Accepted',
    accepted: '2021-05-25',
    obsolete: '',
    rfc: '2021-04-02',
    formalSubmission: '2021-05-01',
    rejected: ''
  } as RelateMipsCuAbout
};

export const Default = Template.bind({});
Default.args = {
  relateMips: {} as RelateMipsCuAbout,

};

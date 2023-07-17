import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ActorTitleWithDescription from './ActorTitleWithDescription';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Actor/ActorTitleWithDescription',
  component: ActorTitleWithDescription,
  parameters: {
    nextRouter: {
      path: '/ecosystem-actors/[code]',
      asPath: '/ecosystem-actors/PH',
      query: {
        code: 'PH',
      },
    },
    chromatic: {
      viewports: [834, 1194, 1280, 1440],
    },
  },
} as ComponentMeta<typeof ActorTitleWithDescription>;
const variantsArgs = [
  {
    actorAbout: new EcosystemActorBuilder()
      .withId('23')
      .withCode('PH-001')
      .withShortCode('PH')
      .withName('Phoenix Labs')
      .withType('EcosystemActor')
      .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
      .addCategory('Active Ecosystem Actor')
      .withSentenceDescription(
        'Phoenix Labs is focused on vertically integrating existing products into Maker and sharing the value creation with developers.'
      )
      .addScope({
        id: '1',
        code: 'SUP',
        name: 'Support Scope',
      })
      .addScope({
        id: '3',
        code: 'PRO',
        name: 'Protocol Scope',
      })
      .withSocials({
        twitter: '#',

        github: '#',
        discord: '#',
        website: '#',
      })
      .build(),
    showTextDescription: true,
    showDescription: true,
  },
];

export const [[Actors, ActorsDark]] = createThemeModeVariants(ActorTitleWithDescription, variantsArgs);

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:268991&mode=design&t=GpgZz7tpji7PCidt-4',
        options: {
          style: {
            left: 4,
            top: -6,
          },
          componentStyle: {
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20298:289949&mode=design&t=0HwrXMZTcoozvoKG-4',
        options: {
          style: {
            left: 0,
            top: -6,
          },
          componentStyle: {
            width: 834,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20298:286888&mode=design&t=P5EzeKAg9Mp9NBW9-4',
        options: {
          style: {
            left: -32,
            top: -6,
          },
          componentStyle: {
            width: 1130,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:280014&mode=design&t=aPrHvenqWtD2de04-4',
        options: {
          style: {
            left: -48,
            top: -6,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:266216&mode=design&t=aPrHvenqWtD2de04-4',
        options: {
          style: {
            left: -64,
            top: -4,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

ActorsDark.parameters = {};

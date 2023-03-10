import { BudgetStatementBuilder } from '@ses/core/businessLogic/builders/budgetStatementBuilder';
import { RecognizedDelegatesBuilder } from '@ses/core/businessLogic/builders/delegatesBuilder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import RecognizedDelegatesContainer from './RecognizedDelegatesContainer';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Recognized Delegates',
  component: RecognizedDelegatesContainer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
    date: '2023-02-23T04:02:02Z',
  },
} as ComponentMeta<typeof RecognizedDelegatesContainer>;

const variantsArgs = [
  {
    delegates: new RecognizedDelegatesBuilder()
      .addBudgetStatement(new BudgetStatementBuilder().withMonth('2023-02').build())
      .build(),
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <RecognizedDelegatesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};
LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A152908&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 375,
          },
          ...optionStyles,
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A156480&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 802,
          },
          ...optionStyles,
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A164183&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 1162,
          },
          ...optionStyles,
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A158198&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 1248,
          },
          ...optionStyles,
        },
      },

      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A152093&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 1407,
          },
          ...optionStyles,
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A154395&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 1888,
          },
          ...optionStyles,
        },
      },
    },
  } as FigmaParams,
};

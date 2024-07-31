import type { Team } from '@/core/models/interfaces/team';
import { ResourceType, TeamStatus } from '@/core/models/interfaces/types';
import type { ContributorsInformation } from './utils/types';

export const headerCardData = {
  title: 'MakerDAO Dashboard',
  description:
    "Welcome to the MakerDAO Dashboard, your hub for key insights into MakerDAO's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about MakerDAO’s progress and future plans.",
  buttonTexts: ['Finances', 'Governance', 'Contributors', 'Roadmap'],
  buttonLinks: ['#finances', '#governance', '#contributors', '#roadmap'],
  buttonShadows: [
    '1px 4px 15px 0px rgba(19, 83, 36, 1)',
    '1px 4px 15px 0px rgba(19, 83, 36, 1)',
    '1px 4px 15px 0px rgba(188, 153, 242, 0.2)',
    '1px 4px 15px 0px rgba(188, 153, 242, 0.5)',
    '1px 4px 15px 0px rgba(25, 144, 255, 0.2)',
    '1px 4px 15px 0px rgba(25, 144, 255, 0.5)',
    '1px 4px 15px 0px rgba(234, 67, 53, 0.2)',
    '1px 4px 15px 0px rgba(234, 67, 53, 0.5)',
  ],
};

export const sectionsData = {
  titles: ['Finances', 'Governance', 'Contributors', 'Roadmap'],
};

export const financesBarChartCardData = {
  title: 'MakerDAO Finances',
  annualProfitLegendAsteriskText: '*All values are converted to DAI',
  annualProfitLegendTitle: 'Annual Profit',
  revenueLegendTitle: 'Revenue',
  revenueLegendButtonTexts: ['Fees', 'Liquidation Income', 'PSM'],
  spendingLegendTitle: 'Spending',
  spendingLegendButtonTexts: ['DAI Spent', 'MKR Vesting'],
  makerburnLinkText: 'makerburn.com',
  detailsLinkText: 'Details',
};

export const financesLineChartCardData = {
  tabButtonsTexts: ['Realized Expenses', 'Operational Reserves', 'Forecast'],
};
// Remove when api connected
export const mockDataDescription: ContributorsInformation[] = [
  {
    title: 'Ecosystem Actors',
    contributors: 21,
    description:
      'Ecosystem Actors are contributor teams that perform essential tasks to benefit the MakerDAO ecosystem. They are divided into two categories: Advisory Council Members and Active Ecosystem Actors. Here, we are referring to the Active Ecosystem Actors who carry out specific projects such as feature development, data collection, marketing, legal work, and other operational activities that benefit the Maker Ecosystem, following the specifications of Scope Alignment Artifacts',
    href: '#',
  },
  {
    title: 'Aligned Delegates ',
    contributors: 23,
    description:
      "Aligned Delegates (ADs) are anonymous Alignment Conserve who use the Protocol Delegation System to enable MKR holders to delegate their voting power. ADs hold significant power and responsibility to maintain the Universal Alignment of the Maker Ecosystem. They must adhere to strict requirements and provide governance information and research material to AVCs, focusing on safeguarding the protocol's alignment",
    href: '#',
  },
  {
    title: 'Keepers',
    contributors: 4,
    description:
      "Keepers are a specialized type of contributor entity that manage and operate certain decentralized financial operations within the Maker Ecosystem. They are responsible for performing functions such as maintaining the stability of the Dai stablecoin by participating in liquidation auctions and other mechanisms that ensure the system's resilience and efficiency. Keepers play a vital role in the decentralized operations of MakerDAO, helping to maintain the economic health and stability of the ecosystem.",
    href: '#',
  },
];

// Asumiendo que estas interfaces están definidas en tu código

export const contributor: Team = {
  id: '1',
  code: 'SES-001',
  shortCode: 'SES',
  name: 'Sustainable Ecosystem Scaling',
  status: TeamStatus.Accepted,
  image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
  budgetPath: 'atlas/legacy/core-units/SES-001/',
  category: ['Technical', 'Growth'],
  sentenceDescription:
    'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.',
  paragraphDescription:
    'The SES Core Unit supports a decentralized, effective, and scalable economy on top of the Maker Protocol that continues to push forward its growth in a sustainable manner...',
  paragraphImage: '',
  lastActivity: {
    created_at: '2024-06-25T08:37:03.648Z',
    description: 'CoreUnit SES has updated their expense report for May 2024',
    event: 'TEAM_BUDGET_STATEMENT_UPDATED',
    id: '2855',
    params: {
      owner: {
        id: 1,
        code: 'SES-001',
        shortCode: 'SES',
        type: ResourceType.CoreUnit,
      },
      budgetStatementId: 1051,
      month: '2024-05',
    },
  },
  legacyBudgetStatementUrl: '',
  budgetId: '',
  type: ResourceType.CoreUnit, // Asegúrate de que este valor sea un valor válido para ResourceType
  auditors: [
    {
      id: '9',
      username: 'deniz',
    },
    {
      id: '34',
      username: 'Patrick_J',
    },
    {
      id: '48',
      username: 'dumitru',
    },
  ],
  socialMediaChannels: [
    {
      forumTag: 'https://forum.makerdao.com/c/core-units/sustainable-ecosystem-scaling',
      github: 'https://github.com/makerdao-ses',
      discord: 'https://discord.gg/h7GKvqDyDP',
      website: 'https://ses.makerdao.network',
      twitter: 'https://twitter.com/MakerDAO_SES',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw',
    },
  ],
  contributorCommitment: [], // Rellena con datos válidos o una lista vacía si no tienes datos
  cuGithubContribution: [], // Rellena con datos válidos o una lista vacía si no tienes datos
  updates: [], // Rellena con datos válidos o una lista vacía si no tienes datos
  scopes: [], // Rellena con datos válidos o una lista vacía si no tienes datos
  budgetStatements: [
    // {
    //   auditReport: [
    //     {
    //       auditStatus: 'Approved',
    //       timestamp: 1654084800000,
    //       budgetStatementId: '199',
    //       reportUrl:
    //         'https://github.com/makerdao-ses/transparency-reporting/blob/main/Monthly%20Budget%20Statements/2021-05.md',
    //     },
    //   ],
    // },
  ],
  cuMip: null, // Asegúrate de que este valor sea compatible con el tipo definido
};

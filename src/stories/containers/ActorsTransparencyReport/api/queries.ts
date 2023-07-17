import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { Team } from '@ses/core/models/interfaces/team';

export const getEcosystemActor = (code: string) => ({
  query: gql`
    query teams($filter: TeamFilter) {
      teams(filter: $filter) {
        id
        code
        shortCode
        sentenceDescription
        name
        image
        legacyBudgetStatementUrl
        auditors {
          id
          username
        }
        budgetStatements {
          id
          month
          status
          publicationUrl
          activityFeed {
            id
            created_at
            event
            params
            description
          }
          comments {
            id
            budgetStatementId
            timestamp
            comment
            status
            author {
              id
              username
            }
          }
          budgetStatementFTEs {
            month
            ftes
          }
          auditReport {
            reportUrl
            timestamp
            auditStatus
          }
          budgetStatementWallet {
            name
            address
            currentBalance
            id
            budgetStatementLineItem {
              group
              actual
              forecast
              budgetCategory
              headcountExpense
              comments
              month
              budgetCap
              payment
            }
            budgetStatementTransferRequest {
              target {
                amount
                calculation
                description
                source {
                  code
                  url
                  title
                }
              }
              requestAmount
              walletBalance
              walletBalanceTimeStamp
            }
          }
          budgetStatementMKRVest {
            id
            mkrAmount
            mkrAmountOld
            vestingDate
            comments
          }
        }
        # TODO: add the equivalent to these fields
        #lastActivity {
        #  id
        #  created_at
        #  event
        #  params
        #  description
        #}
        #activityFeed {
        #  id
        #  created_at
        #  event
        #  params
        #  description
        #}
      }
    }
  `,
  filter: {
    filter: {
      type: 'EcosystemActor',
      code,
    },
  },
});

export const fetchEcosystemActor = async (code: string): Promise<Team> => {
  const { query, filter } = getEcosystemActor(code);
  const res = await request<{ teams: Team[] }>(GRAPHQL_ENDPOINT, query, filter);
  return res?.teams?.[0];
};

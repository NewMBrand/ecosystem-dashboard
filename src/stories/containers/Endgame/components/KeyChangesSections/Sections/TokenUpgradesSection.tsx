import React from 'react';
import KeyChangeCard from '../../KeyChangeCard/KeyChangeCard';

const TokenUpgradesSection: React.FC = () => (
  <>
    <KeyChangeCard
      from="DAI"
      to="DAI + NewStableToken"
      title="Extending the DAI brand"
      readMore={[
        {
          title: 'View AVCs & Delegates on the voting portal',
          href: '#',
        },
        {
          title: 'Overview of recognized delegates legacy budgets',
          href: '#',
        },
      ]}
    >
      Due to voter apathy within MakerDAO governance and DAOs more broadly, the DAO will transition from a model of
      recognized delegates to two groups aligned voter committees, and aligned delegates. MKR holders who are interested
      in Maker governance can now participate in voter committees of their liking to discuss policy with the relevant
      delegates.
    </KeyChangeCard>
    <KeyChangeCard
      from="MKR"
      to="MKR + NewGovToken"
      title="A better voter incentive model"
      readMore={[
        {
          title: 'Maker Atlas & Scope Artifacts full text',
          href: '#',
        },
        {
          title: 'View the legacy MIPs portal',
          href: '#',
        },
      ]}
    >
      Before Endgame, Maker Improvement Proposals allowed any change to Maker Governance without much restriction or
      direction. The Endgame plan introduces the Maker Atlas which defines much better what the core business of the
      Maker Protocol is all about. It also introduces 5 Scope Artifacts which defines how Maker should operate within
      different operational areas.
    </KeyChangeCard>
  </>
);

export default TokenUpgradesSection;
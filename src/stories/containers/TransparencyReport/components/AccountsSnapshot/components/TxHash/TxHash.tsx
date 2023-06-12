import styled from '@emotion/styled';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import React from 'react';

interface TxHashProps {
  txHash: string;
  className?: string;
}

const TxHash: React.FC<TxHashProps> = ({ txHash, ...props }) => {
  const formattedHash = txHash.length <= 16 ? txHash : `${txHash.slice(0, 16)}...`;

  return (
    <TxHashContainer {...props}>
      <Hash href={`https://etherscan.io/tx/${txHash}`} target="_blank">
        {formattedHash}
      </Hash>
      <CopyIcon text={txHash} defaultTooltip="Copy Transaction Hash" />
    </TxHashContainer>
  );
};

export default TxHash;

const TxHashContainer = styled.div({
  display: 'flex',
});

const Hash = styled.a(() => ({
  fontSize: 12,
  lineHeight: '15px',
  color: '#447AFB',
}));

import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AppRoute } from '@/constants/routes';

import { layoutMixins } from '@/styles/layoutMixins';

import { AssetIcon } from '@/components/AssetIcon';
import { BackButton } from '@/components/BackButton';
import { Output, OutputType } from '@/components/Output';
import { MidMarketPrice } from '@/views/MidMarketPrice';

import { useAppSelector } from '@/state/appTypes';
import { getCurrentMarketAssetData } from '@/state/assetsSelectors';
import { getCurrentMarketData } from '@/state/perpetualsSelectors';

import { MustBigNumber } from '@/lib/numbers';

export const TradeHeaderMobile = () => {
  const { name, id } = useAppSelector(getCurrentMarketAssetData, shallowEqual) ?? {};
  const navigate = useNavigate();

  const { displayId, priceChange24H, priceChange24HPercent } =
    useAppSelector(getCurrentMarketData, shallowEqual) ?? {};

  return (
    <$Header>
      <BackButton onClick={() => navigate(AppRoute.Markets)} />
      <div tw="inlineRow gap-[1ch]">
        <AssetIcon symbol={id} tw="text-[2.5rem]" />
        <$Name>
          <h3>{name}</h3>
          <span>{displayId}</span>
        </$Name>
      </div>

      <$Right>
        <MidMarketPrice />
        <$PriceChange
          type={OutputType.Percent}
          value={MustBigNumber(priceChange24HPercent).abs()}
          isNegative={MustBigNumber(priceChange24H).isNegative()}
        />
      </$Right>
    </$Header>
  );
};
const $Header = styled.header`
  ${layoutMixins.contentSectionDetachedScrollable}

  ${layoutMixins.stickyHeader}
  z-index: 2;

  ${layoutMixins.row}

  padding-left: 1rem;
  padding-right: 1.5rem;
  gap: 1rem;

  color: var(--color-text-2);
  background-color: var(--color-layer-2);
`;
const $Name = styled.div`
  ${layoutMixins.rowColumn}

  h3 {
    font: var(--font-large-medium);
  }

  > :nth-child(2) {
    font: var(--font-mini-book);
    color: var(--color-text-0);
  }
`;

const $Right = styled.div`
  margin-left: auto;

  ${layoutMixins.rowColumn}
  justify-items: flex-end;
`;

const $PriceChange = styled(Output)<{ isNegative?: boolean }>`
  font: var(--font-small-book);
  color: ${({ isNegative }) => (isNegative ? `var(--color-negative)` : `var(--color-positive)`)};
`;

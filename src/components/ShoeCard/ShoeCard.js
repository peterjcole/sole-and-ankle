import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, pluralize, isNewShoe} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
                      slug,
                      name,
                      imageSrc,
                      price,
                      salePrice,
                      releaseDate,
                      numOfColors,
                  }) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
        ? 'on-sale'
        : isNewShoe(releaseDate)
            ? 'new-release'
            : 'default'

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <Flag variant={variant}/>
                <ImageWrapper>
                    <Image alt="" src={imageSrc}/>
                </ImageWrapper>
                <Spacer size={12}/>
                <Row>
                    <Name>{name}</Name>
                    <Price variant={variant}>{formatPrice(price)}</Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                    {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
  flex-basis: 340px;
`;

const Wrapper = styled.article`
  position: relative
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${props => props.variant === 'on-sale' && `
  text-decoration: line-through;
  color: ${COLORS.gray["700"]}
  `}
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

// This is messy but I'm feeling lazy
const Flag = styled.div`
  ${props => props.variant === 'default' && 'display: none;'}
  position: absolute;
  right: -4px;
  top: 12px;
  padding: 8px;
  background-color: ${props => {
    return {
      'on-sale': COLORS.primary,
      'new-release': COLORS.secondary
    }[props.variant]
  }};
  color: white;
  font-weight: 700;
  border-radius: 2px;
  z-index: 1000;

  &::after {
    content: ${props => {
      return {
        'on-sale': "'Sale'",
        'new-release': "'Just Released!'"
      }[props.variant]
    }};
  }
`

export default ShoeCard;

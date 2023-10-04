/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import ServiceCard from 'components/molecules/ServiceCard';
import Container from 'layouts/Container';
import ContentWrapper from 'layouts/ContentWrapper';
import React from 'react';
import { ICoachFields, IPageFields } from 'types/contentful';
import { urlify } from 'utils/helpers';
import SimplePageLayout from 'layouts/SimplePageLayout';

interface Props {
  coaches: ICoachFields[];
  page: IPageFields;
  pageContent: any;
}

const BorderRight = styled.div`
  height: 1px;
  background: #aaa;
  width: 100%;
`;

const BorderMessage = styled.div`
  background: #fff;
  position: relative;
  top: -40px;
  width: 297px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: auto;
`;

function renderOptions(links: any) {
  if (!links?.assets?.block) {
    return {};
  }
  // create an asset map
  const assetMap = new Map();

  // loop through the linked assets and add them to a map
  for (const asset of links?.assets?.block) {
    assetMap.set(asset?.sys?.id, asset);
  }

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, next: any) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);

        switch (asset.contentType) {
          case 'video/mp4':
            return (
              <video width="100%" height="100%" controls>
                <source src={asset.url} type="video/mp4" />
              </video>
            );
          case 'image/png':
            return (
              <img
                src={asset.url}
                height={asset.height}
                width={asset.width}
                alt={asset.description}
                className={urlify(asset.title)}
              />
            );
          case 'image/jpeg':
            return (
              <img
                src={asset.url}
                height={asset.height}
                width={asset.width}
                alt={asset.description}
                className={urlify(asset.title)}
              />
            );
          case 'image/webp':
            return (
              <img
                src={asset.url}
                height={asset.height}
                width={asset.width}
                alt={asset.description}
                className={urlify(asset.title)}
              />
            );
          default:
            return 'Nothing to see here...';
        }
      },
    },
  };
}

const ServicesPage = ({ page, pageContent, coaches }: Props) => {
  return (
    <SimplePageLayout page={page}>
      <Container>
        <ContentWrapper>
          {documentToReactComponents(
            pageContent?.json,
            renderOptions(pageContent?.links),
          )}
        </ContentWrapper>
        <br />
        <BorderRight />
        <BorderMessage>
          <h5 className="text-5xl text-center font-serif text-forrest">
            Learn more
          </h5>
        </BorderMessage>
        <br />
        <div className="mx-auto max-w-full lg:max-w-6xl">
          {coaches
            .sort((a, b) =>
              (a.appearanceOrder as number) > (b.appearanceOrder as number)
                ? 1
                : -1,
            )
            .map((coach: ICoachFields) => (
              <ServiceCard
                name={coach?.name as string}
                bookTimePhoto={coach?.bookTimePhoto?.url}
                key={coach?.name}
              />
            ))}
        </div>
      </Container>
    </SimplePageLayout>
  );
};

export default ServicesPage;

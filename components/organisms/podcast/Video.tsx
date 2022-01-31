import styled from 'styled-components';
import { VIDEO_PROPS } from 'types/Podcast';

const Video = ({ url, title, description }: VIDEO_PROPS) => (
  <VideoContainer>
    <Iframe
      src={url}
      width="560"
      height="315"
      loading="lazy"
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="mx-auto block"
    />
    <VideoDetails>
      <p className="mt-6 text-base sm:text-2xl text-forrest-900">{title}</p>
      <p className="text-sm sm:text-lg text-forrest">{description}</p>
    </VideoDetails>
  </VideoContainer>
);

const VideoContainer = styled.div`
  @media (min-width: 640px) {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 640px) {
    position: relative;
    width: 100%;
    margin-top: 8rem;
    margin-bottom: 8rem;
  }
`;
const Iframe = styled.iframe`
  @media (max-width: 640px) {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideoDetails = styled.div`
  position: relative;

  @media (max-width: 640px) {
    top: 10em;
    bottom: 10em;
  }
`;

export default Video;

import {
  WelcomeContainer,
  WelcomeTextContainer,
  ImageContainer,
  Image,
  WelcomeTitle,
  WelcomeText
} from "./welcome-styles";
import image from "./homepageimg.jpeg";

const Welcome = () => {
  return (
    <WelcomeContainer>
      <WelcomeTextContainer>
        <WelcomeTitle>All Things Tech.</WelcomeTitle>
        <WelcomeText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Aliquam dictum velit at orci efficitur auctor. 
            Etiam cursus molestie ipsum sed eleifend. 
            Aenean vitae arcu a sapien pretium cursus id non leo. 
            Quisque felis ligula, elementum eu rutrum a, elementum at eros. 
            Cras a nisi tempus, consectetur neque sed, dapibus nisi. 
            Nulla massa ante, convallis a iaculis id, ornare et odio. 
            Curabitur consectetur orci vel nisl vulputate vestibulum. 
            Etiam non hendrerit elit, eget mattis enim. 
        </WelcomeText>
      </WelcomeTextContainer>
      <ImageContainer>
        <Image src={image}></Image>
      </ImageContainer>
    </WelcomeContainer>
  );
};

export default Welcome;

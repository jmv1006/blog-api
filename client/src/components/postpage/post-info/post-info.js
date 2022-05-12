import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AuthorTitleContainer,
  TitleContainer,
  TopContainer,
  PostContentContainer,
  TextContainer,
} from "../post_page_styles";
import Parser from "html-react-parser";

const PostInfo = (props) => {
  return (
    <PostContentContainer>
      {props.post ? (
        <TopContainer>
          <AuthorTitleContainer>
            <div>By: {props.post.author.displayName}</div>
            <div>Published On: {props.post.date}</div>
          </AuthorTitleContainer>
          <TitleContainer>{props.post.title}</TitleContainer>
          <TextContainer>{Parser(props.post.text)}</TextContainer>
        </TopContainer>
      ) : (
        "Loading Post..."
      )}
    </PostContentContainer>
  );
};

export default PostInfo;

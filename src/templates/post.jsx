import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import { graphql } from "gatsby";
import * as s from "../styles";
import Header from "../components/header";
import Layout from "../components/layout";
import "../styles/prism-ghcolors.css";

const formatDate = date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

const Time = styled.time`
  color: ${s.gray};
  text-transform: uppercase;
  font-size: ${s.f6};
  letter-spacing: ${s.tracked};
`;

const Markdown = styled.div`
  line-height: ${s.lhCopy};

  h1 {
    margin-top: ${s.s0};
  }

  h1,
  h2,
  h3,
  h4 {
    margin: ${s.titleMarginTop} 0 ${s.titleMarginBottom};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    max-width: ${s.measureWide};
  }

  p,
  ul,
  ol {
    margin-bottom: ${s.paragraphBottomMargin};

    ul,
    ol {
      margin-bottom: ${s.s0};
    }
  }

  ul,
  ol {
    max-width: ${s.measureWide};
    padding-left: ${s.s4};
  }

  li {
    padding-left: ${s.s1};

    p:first-child {
      margin-top: ${s.s0};
    }

    p:last-of-type {
      margin-bottom: ${s.s2};
    }
  }

  li:not(:last-child) {
    margin-bottom: ${s.s2};
  }

  hr {
    border-top: 1px solid ${s.lightGray};
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin: ${s.s5} ${s.s0};
  }

  blockquote {
    max-width: ${s.measureWide};
    padding-left: ${s.s3};
    margin-left: ${s.s0};
    border-left: 1px solid ${s.lightGray};
  }

  code {
    font-size: ${s.f6};
  }

  img {
    outline: 1px solid ${s.lightGray};
    max-width: 100%;
  }

  strong,
  b {
    font-weight: 500;
  }

  .gatsby-resp-image-link {
    &:focus {
      outline: 2px dotted currentColor;
    }

    + em {
      color: ${s.gray};
      display: block;
      margin: ${s.s3} ${s.s2};
      font-size: ${s.f6};
    }

    &:hover img {
      outline: 1px solid ${s.moonGray};
    }
  }
`;

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div itemScope itemType="http://schema.org/Article">
        <Helmet>
          <meta property="og:type" content="article" />
          {post.frontmatter.title && <title>{post.frontmatter.title}</title>}
          {post.frontmatter.title && (
            <meta property="og:title" content={post.frontmatter.title} />
          )}
          {site.siteUrl &&
            post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp.original.src && (
              <meta
                property="og:image"
                content={
                  site.siteUrl +
                  post.frontmatter.image_src.childImageSharp.original.src
                }
              />
            )}
          {post.frontmatter.is_featured && post.frontmatter.image_src ? (
            <meta name="twitter:card" content="summary_large_image" />
          ) : (
            <meta name="twitter:card" content="summary" />
          )}
          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp.original.width && (
              <meta
                property="og:image:width"
                content={
                  post.frontmatter.image_src.childImageSharp.original.width
                }
              />
            )}
          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp.original.height && (
              <meta
                property="og:image:height"
                content={
                  post.frontmatter.image_src.childImageSharp.original.height
                }
              />
            )}
          {post.frontmatter.image_src &&
            post.frontmatter.image_src.internal.mediaType && (
              <meta
                property="og:image:type"
                content={post.frontmatter.image_src.internal.mediaType}
              />
            )}
          {post.frontmatter.image_alt && (
            <meta
              property="og:image:alt"
              content={post.frontmatter.image_alt}
            />
          )}
          {post.frontmatter.date && (
            <meta
              property="article:published_time"
              content={post.frontmatter.date}
            />
          )}
          {site.siteUrl &&
            post.frontmatter.path && (
              <meta
                property="og:url"
                content={site.siteUrl + post.frontmatter.path}
              />
            )}
          {post.frontmatter.description && (
            <meta name="description" content={post.frontmatter.description} />
          )}
          {post.frontmatter.description && (
            <meta
              property="og:description"
              content={post.frontmatter.description}
            />
          )}
          {post.frontmatter.tags && (
            <meta name="keywords" content={post.frontmatter.tags} />
          )}
          {post.frontmatter.tags && (
            <meta property="article:tag" content={post.frontmatter.tags} />
          )}
          {post.frontmatter.canonical && (
            <link rel="canonical" href={post.frontmatter.canonical} />
          )}
        </Helmet>

        <Header isSinglePost />

        <Time
          dateTime={post.frontmatter.date}
          itemProp="datePublished"
          title={new Date(post.frontmatter.date).toString()}
        >
          {formatDate(new Date(post.frontmatter.date))}
        </Time>

        <h1 itemProp="headline">{post.frontmatter.title}</h1>

        {site.siteUrl &&
          post.frontmatter.image_src &&
          post.frontmatter.image_src.childImageSharp.original.src && (
            <meta
              itemProp="image"
              content={
                site.siteUrl +
                post.frontmatter.image_src.childImageSharp.original.src
              }
            />
          )}

        <Markdown
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  );
  /* eslint-enable react/no-danger */
};

export default Post;

Post.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.shape({
        node: PropTypes.shape({})
      })
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired
      })
    })
  })
};

Post.defaultProps = {
  data: {}
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        title
        tags
        description
        canonical
        is_featured
        image_alt
        image_src {
          internal {
            mediaType
          }
          childImageSharp {
            original {
              width
              height
              src
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

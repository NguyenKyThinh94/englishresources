import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Player from '../components/Player'

export const VoaLessonTemplate = ({
  content,
  contentComponent,
  // templateKey,
  title,
  mainVideo,
  titleDownload,
  mainDownload,
  titleSpeckingPractice,
  speakingPracticeVideo,
  titlePronunciation,
  pronunciationVideo,
  titleConversation,
  conversationAudio,
  conversationSub,
  imgDownload,
  // description,
  tags,
  helmet
}) => {
  const PostContent = contentComponent || Content
  const conversationSubs = conversationSub.split('/')
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div className='player-wrapper'>
              <Player url={mainVideo} style={{ width: '100%', height: '650px' }} />
            </div>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">{titleDownload}</h2>
              <Link to={mainDownload}>
                <img alt='download-img' border="0" src={imgDownload} />
              </Link>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {titleSpeckingPractice}
            </h2>
            <div className='player-wrapper'>
              <Player url={speakingPracticeVideo} />
            </div>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {titlePronunciation}
            </h2>
            <div className='player-wrapper'>
              <Player url={pronunciationVideo} />
            </div>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {titleConversation}
            </h2>
            <div className='player-wrapper-mini'>
              <Player url={conversationAudio} />
            </div>
            {conversationSubs && conversationSubs.length ? (
              <div style={{ marginTop: `1rem` }}>
                <ul className="conversation-list">
                  {conversationSubs.map((sub, index) => (
                    <li key={index + `sub`}>{sub}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

VoaLessonTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  templateKey: PropTypes.string,
  title: PropTypes.string,
  mainVideo: PropTypes.string,
  titleDownload: PropTypes.string,
  mainDownload: PropTypes.string,
  titleSpeckingPractice: PropTypes.string,
  speakingPracticeVideo: PropTypes.string,
  titlePronunciation: PropTypes.string,
  pronunciationVideo: PropTypes.string,
  titleConversation: PropTypes.string,
  conversationAudio: PropTypes.string,
  conversationSub: PropTypes.string,
  description: PropTypes.string,
  imgDownload: PropTypes.string,
  tags: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(post)

  return (
    <Layout>
      <VoaLessonTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | VOA Lesson">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        templateKey={post.frontmatter.templateKey}
        mainVideo={post.frontmatter.mainVideo}
        titleDownload={post.frontmatter.titleDownload}
        mainDownload={post.frontmatter.mainDownload}
        titleSpeckingPractice={post.frontmatter.titleSpeckingPractice}
        speakingPracticeVideo={post.frontmatter.speakingPracticeVideo}
        titlePronunciation={post.frontmatter.titlePronunciation}
        pronunciationVideo={post.frontmatter.pronunciationVideo}
        titleConversation={post.frontmatter.titleConversation}
        conversationAudio={post.frontmatter.conversationAudio}
        conversationSub={post.frontmatter.conversationSub}
        imgDownload={post.frontmatter.imgDownload}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query VoaLessonByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        templateKey,
        title,
        mainVideo,
        titleDownload,
        mainDownload,
        titleSpeckingPractice,
        speakingPracticeVideo,
        titlePronunciation,
        pronunciationVideo,
        titleConversation,
        conversationAudio,
        conversationSub,
        description,
        imgDownload,
        tags
      }
    }
  }
`

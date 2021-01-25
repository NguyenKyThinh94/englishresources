import { Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import LestLearnEng1Roll from '../../components/LestLearnEng1Roll'
export default class VoaIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <div style={{ display: 'flex', alignContent: 'center' }}>
                <p className='section-head'>About Let's Learn English - Level 1</p>
                <Link to='https://learningenglish.voanews.com/p/5644.html'>From VOA</Link>
              </div>
              <p className="description-main" >Let's Learn English - Level 1 is a new course for English learners. Certified American English teachers designed the course for beginners. The course continues for 52 weeks. Each week, there will be a new lesson with video showing the lives of young Americans. The lesson includes instruction in speaking, vocabulary and writing. There are also printable worksheets, assessments and lesson plans for individual learners and English teachers.
</p>
              <LestLearnEng1Roll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

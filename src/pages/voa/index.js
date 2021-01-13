import { Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import LestLearnEng1Roll from '../../components/LestLearnEng1Roll'
import { DecriptionVOALetlearnEnglish } from './constant'

export default class VoaIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <p className='section-head'>About Let's Learn English - Level 1</p>
              <p className="description-main" >{DecriptionVOALetlearnEnglish}</p>
              <Link to='https://learningenglish.voanews.com/p/5644.html'>From VOA learn english</Link>
               <LestLearnEng1Roll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

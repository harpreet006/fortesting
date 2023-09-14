import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import axiosauth from '../../api/axios-auth';
import ReactHtmlParser from 'react-html-parser';
import Privacy from '../Privacy';
import BrowserTitle from '../../components/helper/BrowserTitle';

const PrivacyPolicy = () => {

    const [content, setContent] = useState(null);

    useEffect(() => {
  
  
      function getCMS() {
  
        try {
          axiosauth.get(`/api/v1/cms/cmstype/privacy`).then(response => {
            let res = JSON.parse(response.data)
            // console.log("")
            if (res.statusCode === 200) {
              setContent(ReactHtmlParser(res.data?.data))
            }
          }).catch((error) => {
          }).then(() => {
            console.log("-----always executes");
          })
        } catch (e) { }
  
      }
  
  
      getCMS()
  
      window.scrollTo(0, 0);
    }, [])

    return (
        <Layout>
          <BrowserTitle title={`Privacy Policy`} />
      <br /> <br /> <br />
      <Privacy onPage={true} content={content} />
    </Layout>
    )
}

export default PrivacyPolicy

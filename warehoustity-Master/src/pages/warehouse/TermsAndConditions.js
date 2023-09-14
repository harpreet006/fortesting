import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import TermAndCondition from '../TermAndCondition';
import axiosauth from '../../api/axios-auth';
import ReactHtmlParser from 'react-html-parser';
import BrowserTitle from '../../components/helper/BrowserTitle';

const TermsAndConditions = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    function getCMS() {

      try {
        axiosauth.get(`/api/v1/cms/cmstype/tandc`).then(response => {
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
      <BrowserTitle title="Terms and Condition" />
      <br /> <br /> <br />
      <TermAndCondition onPage={true} content={content} />
    </Layout>
  );
}

export default TermsAndConditions;

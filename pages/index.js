import Layout from "../components/Layout";
import { client } from '../utils/client';
import { Products } from '../components/imports'
import React from "react";

const Home = ({ products }) => {
  return (
    <Layout>
      <Products products={products} />
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type=='product']`)
  return {
    props: {
      products
    }
  }
}

export default React.memo(Home);
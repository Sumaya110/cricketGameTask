import React from 'react'
import Match from '@/components/Match/Match'

const id = ({data}) => {
  return (
    <Match Id ={data}/>
  )
}

export default id


export async function getServerSideProps(context){
  const id = context.query.id;
  return{
    props:{
      data: id,
    }
  }
}
import MatchSummary from '@/components/MatchSummary/MatchSummary'
import React from 'react'


const id = ({data}) => {
    return (
      <MatchSummary Id ={data}/>
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
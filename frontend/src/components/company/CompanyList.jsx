import React from 'react'
import CompanyItem from './CompanyItem'

const CompanyList = ({ companies }) => {
    return (
        <div className='grid grid-cols-3 gap-3 rounded-sm'>
            {
                companies && companies.map((company) => {
                    return <CompanyItem key={company._id} company={company} />
                })
            }
        </div>
    )
}

export default CompanyList

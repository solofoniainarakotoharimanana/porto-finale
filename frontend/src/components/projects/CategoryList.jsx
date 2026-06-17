import React from 'react'

const CategoryList = ({ categories, setCatToFilter, catToFilter }) => {

    return (
        <div className='w-full flex justify-center items-center gap-3 my-3'>
            <button
                onClick={() => setCatToFilter("")}
                className='py-3 px-2 border-1 
                    border-slate-950 
                    bg-transparent text-slate-950
                    rounded-lg font-bold cursor-pointer
                    hover:bg-slate-800 hover:text-white/90
                    transition-all duration-300 ease-in-out
                    '
            >
                ALL
            </button>

            {categories?.map((c) => {
                return <button
                    onClick={() => setCatToFilter(c.title)}
                    key={c._id}
                    className={`py-3 px-2 border-1 
                    rounded-lg font-bold cursor-pointer
                    transition-all duration-300 ease-in-out
                    ${catToFilter.toLowerCase() === c.title.toLowerCase() ? 'bg-slate-800 text-white/90 hover:bg-white/90 hover:text-slate-800' : ' border-slate-950 bg-transparent text-slate-950 hover:bg-slate-800 hover:text-white/90'}
                    
                    `}

                >
                    {c.title}
                </button>
            })}
        </div>
    )
}

export default CategoryList

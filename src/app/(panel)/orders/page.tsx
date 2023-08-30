import React from 'react'

export default function page() {

    const values = ", silef,seif,siefls,fself,".split(',');

    return (
        <>
            {values.map(i => <p key={i}>{i}</p>)}
        </>
    )
}

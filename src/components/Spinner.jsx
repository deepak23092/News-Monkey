import React from 'react';

const Spinner = () => {
    return (
        <div className='text-center'>
            <img src="/loading.gif" alt="loading..." className='my-3' style={{ width: '60px' }} />
        </div>
    );
}

export default Spinner;

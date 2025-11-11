import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=' mx-auto py-8'>
      <div className='flex justify-center items-center gap-8 mb-8'>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='h-16 w-16 hover:opacity-75 transition-opacity' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img
            src={reactLogo}
            className='h-16 w-16 hover:opacity-75 transition-opacity animate-spin'
            alt='React logo'
          />
        </a>
      </div>
      <h1 className='text-center mb-8 text-blue-600 text-4xl font-bold'>Vite + React</h1>
      <div className='card mx-auto max-w-md text-center'>
        <button
          className='bg-primary text-white px-4 py-2 rounded border-none text-sm mb-4'
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className='mb-4'>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='text-center text-gray-600 mt-8'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;

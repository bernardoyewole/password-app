import './style/index.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const password = '1234';
  const inputRef = useRef();

  const [userInput, setUserInput] = useState([]);
  const [state, setState] = useState({ isHidden: false, isVisible: false });

  const handleClick = (index) => {
    if (userInput.length < 4) {
      setUserInput((prevInput) => [...prevInput, numbers[index]]);
    }
  }

  const compareToPassword = () => {
    if (userInput.join('') !== password) {
      inputRef.current.classList.add('error');
    } else {
      setState({ isHidden: true, isVisible: true });
    }
  }

  useEffect(() => {
    if (userInput.length === 4) {
      compareToPassword();
      setTimeout(() => {
        setUserInput([]);
        inputRef.current.classList.remove('error');
      }, 300)
    }
  }, [userInput]);

  return (
    <section className='container'>
      <div className='app-container'>
        <div className={`message ${state.isVisible ? 'visible' : 'not-visible'}`}>
          <p>Welcome</p>
        </div>
        <div className={`lock-screen ${state.isHidden ? 'hidden' : 'not-hidden'}`}>
          <form>
            <input type='password' readOnly value={userInput.join('')} ref={inputRef} />
          </form>
          <div className='numbers-container'>
            {numbers.map((number, index) => (
              <div key={index} className='number' onClick={() => handleClick(index)}>{number}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

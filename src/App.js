import Greeting from './components/Greeting';
import './App.css';

function App() {
  return (
    <div className="App">
      <Greeting />
    </div>
  );
}

export default App;

/*
Grouping tests in Test Suites by function describe.
*/
// npm test
/*
App.test.js:
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // tohle je regExp (i - case insensitive)
  expect(linkElement).toBeInTheDocument();
});
*/
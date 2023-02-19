import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'mobx-react';
// import RootStore from '../stores';
import App from '../App';

// const store = new RootStore();

// const renderContent = (
//   <Router>
//     <Provider {...store}>
//       <App />
//     </Provider>
//   </Router>
// )

test('renders sdk menu', () => {
  render(<Router>
    <App />
  </Router>);
  const sdkElement = screen.getByText(/SDK Management/i);
  expect(sdkElement).toBeInTheDocument();
});


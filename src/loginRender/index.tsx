import { createRoot } from 'react-dom/client';
import App from '../renderer/App';
import 'antd/dist/antd.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);
root.render(<App />);

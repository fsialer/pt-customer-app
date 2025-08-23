import MyRoutes from './routes';
import { NotificationProvider } from './utils/NotificationContext';

function App() {
  return (
    <>
      <NotificationProvider>
        <MyRoutes>
        </MyRoutes>
      </NotificationProvider>
    </>

  );
}

export default App

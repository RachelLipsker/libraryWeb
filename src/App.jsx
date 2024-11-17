import Router from './routes/Router'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import UserProvider from './users/providers/UserProvider'
import SnackbarProvider from './providers/snackBarProvider'

function App() {
  return (
    <>
      <BrowserRouter>
        <SnackbarProvider>
          <UserProvider>
            <Layout>
              <Router />
            </Layout>
          </UserProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App

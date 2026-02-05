import Registration from './pages/Registration'
import Authorisation from './pages/Authorisation'
import Profile from './pages/Profile'
import { authController, router } from './settings'
import './styles.css'

window.addEventListener('DOMContentLoaded', async () => {
  await authController.getUser()
  router.use('/signup', Registration).use('/auth', Authorisation).use('/profile', Profile).start()
})

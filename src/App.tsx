import Design10 from './designs/Design10'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <Design10 />
    </LanguageProvider>
  )
}

export default App

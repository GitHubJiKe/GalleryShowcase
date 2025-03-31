
import { useState } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { FiSun, FiMoon, FiZoomIn, FiShare2, FiHeart } from 'react-icons/fi'
import Gallery from './components/Gallery'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`

const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
})

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContainer theme={{
        bg: theme === 'light' ? '#ffffff' : '#121212',
        text: theme === 'light' ? '#333333' : '#f5f5f5'
      }}>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Gallery theme={theme} />
      </AppContainer>
    </ThemeContext.Provider>
  )
}

const HeaderContainer = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.border};
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

function Header({ toggleTheme, theme }: { toggleTheme: () => void, theme: string }) {
  return (
    <HeaderContainer theme={{
      border: theme === 'light' ? '#eaeaea' : '#333333'
    }}>
      <h1>GalleryShowcase</h1>
      <ThemeToggle onClick={toggleTheme}>
        {theme === 'light' ? <FiMoon /> : <FiSun />}
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </ThemeToggle>
    </HeaderContainer>
  )
}

export default App

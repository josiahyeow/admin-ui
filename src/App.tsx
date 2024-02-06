import { css } from '@emotion/react'
import { UserTable } from './components/user-table'

function App() {
  return (
    <div css={styles.layout}>
      <UserTable />
    </div>
  )
}

const styles = {
  layout: css`
    margin-top: 2em;
    @media (min-width: 580px) {
      margin: 4em auto;
      margin-top: 4em;
      max-width: 60em;
    }
  `,
}

export default App

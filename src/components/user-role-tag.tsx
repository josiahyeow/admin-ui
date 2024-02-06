import { css } from '@emotion/react'
import { color } from '../styles/colors'

export function UserRoleTag({ role }: { role: string }) {
  return <div css={styles.tag(role)}>{role}</div>
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return { color: color.green80, backgroundColor: color.green10 }
    case 'member':
      return { color: color.blue80, backgroundColor: color.blue10 }
    default:
      return { color: color.grey80, backgroundColor: color.grey10 }
  }
}
const styles = {
  tag: (role: string) => css`
    text-align: center;
    color: ${getRoleColor(role).color};
    background-color: ${getRoleColor(role).backgroundColor};
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    border-radius: 0.8rem;
    font-weight: 500;
  `,
}

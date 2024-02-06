import { css } from '@emotion/react'
import { color } from './colors'

const input = css`
  border: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${color.grey95};
  }
`

const button = css`
  border: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    border: none;
    outline: none;
    box-shadow: 0px 0px 0px 2px ${color.grey95};
    cursor: pointer;
  }
`

export const ui = { input, button }

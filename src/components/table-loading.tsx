import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function TableLoading() {
  return (
    <>
      <Skeleton height="52px" width="100%" />
      <Skeleton height="565px" width="100%" />
      <Skeleton height="33px" width="100%" />
    </>
  )
}

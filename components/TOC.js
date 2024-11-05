import Link from 'next/link'

import useScrollSpy from '../lib/scrollSpy'

/**
 * This offset is meant for the smooth scrolling and
 * Scrollspy to take into account the header height
 */
const OFFSET = 100

const Table_of_Contents = ({ ids }) => {
  const [currentActiveIndex] = useScrollSpy(
    ids.map((item) =>
      document.querySelector(`#${item.id.toString()}`).parentElement.closest('section')
    ),
    { offset: OFFSET }
  )
  if (ids.length > 0) {
    return (
      <div className="table-of-contents mt-8">
        <ul>
          {ids.map((item, index) => {
            return (
              // eslint-disable-next-line @next/next/link-passhref
              <Link href={`#${item.id}`} key={item.id}>
                <span
                  className={
                    currentActiveIndex === index
                      ? 'font-medium text-peach underline '
                      : 'text:text hover:italic '
                  }
                >
                  <li key={item.id} className="py-4">
                    {item.title}
                  </li>
                </span>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }
  return <></>
}

export default Table_of_Contents

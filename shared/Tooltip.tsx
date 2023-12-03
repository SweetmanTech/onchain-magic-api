import React, { PropsWithChildren } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface Props {
  id: string
  message: string
  style?: any
  place: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'
}

const Tooltip = ({
  children,
  message,
  id,
  style,
  place
}: PropsWithChildren<Props>) => {
  return (
    <div
      data-tooltip-id={id}
      data-tooltip-html={message}
      data-tooltip-place={place}
    >
      <ReactTooltip id={id} 
        style={style || {}}
        place={place}
      />
      {children}
    </div>
  )
}

export default Tooltip
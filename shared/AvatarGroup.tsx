import * as React from "react"

interface AvatarGroupProps {
  children: any
  count: number
  size?: string
}

const styles = {
  gap: {
    mini: 5,
    small: 10,
    medium: 10,
    large: 20,
  },
  sizes: {
    mini: 24,
    small: 36,
    medium: 48,
    large: 128,
  },
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, count, size }) => (
  <div
    className="relative"
    style={{
      width: `${(styles.sizes[size] - styles.gap[size]) * count + styles.gap[size]}px`,
      height: `${styles.sizes[size]}px`,
    }}
  >
    {children &&
      children.map((child: any, index: number) => (
        <div
          className={`relative z-[${index}] w-[${styles.sizes[size]}px] h-[${styles.sizes[size]}px]`}
          style={{
            transform: `translateX(${
              (styles.sizes[size] - styles.gap[size]) * index
            }px) translateY(-${styles.sizes[size] * index}px)`,
          }}
          key={index}
        >
          {child}
        </div>
      ))}
  </div>
)

AvatarGroup.defaultProps = {
  size: "medium",
}
export default AvatarGroup

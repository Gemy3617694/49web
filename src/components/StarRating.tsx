// src/components/AdvancedStarRating.tsx
import React, { useState, useRef } from 'react'

interface AdvancedStarRatingProps {
  rating?: number
  onRatingChange?: (rating: number) => void
  maxStars?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  allowHalfStars?: boolean
  readonly?: boolean
  showTooltip?: boolean
}

const AdvancedStarRating: React.FC<AdvancedStarRatingProps> = ({
  rating = 5,
  onRatingChange,
  maxStars = 5,
  size = 'md',
  allowHalfStars = false,
  readonly = false,
  
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)
  const [isHovering, setIsHovering] = useState(false)
  const starRefs = useRef<(HTMLButtonElement | null)[]>([])

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  }

  const getStarFill = (starIndex: number, ratingValue: number): string => {
    const starValue = starIndex + 1

    if (ratingValue >= starValue) {
      return 'full'
    } else if (allowHalfStars && ratingValue >= starValue - 0.5) {
      return 'half'
    } else {
      return 'empty'
    }
  }

  const calculateRating = (
    event: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    if (!allowHalfStars) return starIndex + 1

    const starElement = starRefs.current[starIndex]
    if (!starElement) return starIndex + 1

    const rect = starElement.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const starWidth = rect.width

    return clickX < starWidth / 2 ? starIndex + 0.5 : starIndex + 1
  }

  const handleStarClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    if (readonly) return

    const newRating = calculateRating(event, starIndex)
    setCurrentRating(newRating)
    onRatingChange?.(newRating)
  }

  const handleStarHover = (
    event: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    if (readonly) return

    const newHoverRating = calculateRating(event, starIndex)
    setHoverRating(newHoverRating)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
    setIsHovering(false)
  }

  const displayRating = isHovering ? hoverRating : currentRating

  return (
    <div className='flex flex-col items-start space-y-3'>
      <div
        className='flex items-center space-x-1'
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(maxStars)].map((_, index) => {
          const fillType = getStarFill(index, displayRating)

          return (
            <button
              key={index}
              ref={el => (starRefs.current[index] = el)}
              type='button'
              className={`${sizeClasses[size]} transition-all duration-200 ${
                fillType !== 'empty' ? 'text-yellow-400' : 'text-gray-300'
              } ${
                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              }`}
              onClick={e => handleStarClick(e, index)}
              onMouseMove={e => handleStarHover(e, index)}
              disabled={readonly}
            >
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                {/* Half star */}
                {fillType === 'half' && (
                  <path
                    d='M10 1L7.36 6.36L1 7.36L5.68 11.28L4.36 17.64L10 14.64L15.64 17.64L14.32 11.28L19 7.36L12.64 6.36L10 1Z'
                    fill='url(#halfGradient)'
                  />
                )}
                {/* Full star */}
                {fillType === 'full' && (
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                )}
                {/* Empty star outline */}
                {fillType === 'empty' && (
                  <path
                    stroke='currentColor'
                    strokeWidth='1'
                    d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    fill='none'
                  />
                )}
              </svg>

              {/* Gradient for half stars */}
              <svg width='0' height='0'>
                <defs>
                  <linearGradient
                    id='halfGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='0%'
                  >
                    <stop offset='50%' stopColor='currentColor' />
                    <stop offset='50%' stopColor='transparent' />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          )
        })}
      </div>

     
    </div>
  )
}

export default AdvancedStarRating

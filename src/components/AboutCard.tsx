import { useState, useRef, useEffect } from 'react'
import './AboutCard.css'

interface AboutCardProps {
  title: string;
  content: string;
}

const AboutCard = ({ title, content }: AboutCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setShowReadMore(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      )
    }
  }, [])

  return (
    <div className="about-card">
      <h3 className="about-card-title">{title}</h3>
      <p
        ref={contentRef}
        className="about-card-content"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {content}
      </p>
      {showReadMore && (
        <button
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
          <span className="btn-arrow">{isExpanded ? '↑' : '→'}</span>
        </button>
      )}
    </div>
  )
}

export default AboutCard
"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import  coursesData  from "../data/coursesData"
import "../styles/VideoPlayer.css"

const VideoPlayer = ({ user }) => {
  const { courseId, moduleId, videoId } = useParams()
  const [course, setCourse] = useState(null)
  const [currentModule, setCurrentModule] = useState(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [expandedModules, setExpandedModules] = useState({})
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState("")

  const videoRef = useRef(null)
  const controlsTimerRef = useRef(null)

  useEffect(() => {
    // Simulate API call to get course and video details
    const fetchCourseAndVideo = () => {
      setIsLoading(true)

      // Find course by id
      const foundCourse = coursesData.find((course) => course.id === Number.parseInt(courseId))

      if (foundCourse) {
        setCourse(foundCourse)

        // Find module
        const foundModule = foundCourse.modules.find((module) => module.id === Number.parseInt(moduleId))

        if (foundModule) {
          setCurrentModule(foundModule)

          // Find video
          const foundVideo = foundModule.lectures.find((lecture) => lecture.id === Number.parseInt(videoId))

          if (foundVideo) {
            setCurrentVideo(foundVideo)
          }
        }
      }

      setIsLoading(false)
    }

    fetchCourseAndVideo()

    // Initialize expanded modules
    if (moduleId) {
      setExpandedModules({ [moduleId]: true })
    }

    // Clean up controls timer
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
      }
    }
  }, [courseId, moduleId, videoId])

  const toggleModule = (id) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current)
    }

    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleFullscreen = () => {
    const videoContainer = document.querySelector(".video-container")

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else if (videoContainer) {
      videoContainer.requestFullscreen()
    }
  }

  const handleSaveNotes = () => {
    // In a real app, you would save notes to a database
    console.log("Saving notes:", notes)
    alert("Notes saved successfully!")
  }

  if (isLoading) {
    return <div className="loading-spinner">Loading video...</div>
  }

  if (!course || !currentModule || !currentVideo) {
    return (
      <div className="video-not-found">
        <h2>Video Not Found</h2>
        <p>The video you're looking for doesn't exist or has been removed.</p>
        <Link to={`/course/${courseId}`} className="back-to-course">
          Back to Course
        </Link>
      </div>
    )
  }

  return (
    <div className="video-player-page">
      <div className="video-player-container">
        <div className="video-container" onMouseMove={handleMouseMove}>
          <video
            ref={videoRef}
            src={currentVideo.videoUrl || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={handlePlayPause}
          />

          <div className={`video-controls ${showControls ? "visible" : "hidden"}`}>
            <div className="progress-bar" onClick={handleSeek}>
              <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>

            <div className="controls-main">
              <div className="controls-left">
                <button className="control-button" onClick={handlePlayPause}>
                  <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                </button>

                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span> / </span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="controls-right">
                <div className="volume-control">
                  <button className="control-button">
                    <i className={`fas ${volume === 0 ? "fa-volume-mute" : "fa-volume-up"}`}></i>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>

                <button className="control-button" onClick={() => setShowNotes(!showNotes)}>
                  <i className="fas fa-sticky-note"></i>
                </button>

                <button className="control-button" onClick={handleFullscreen}>
                  <i className="fas fa-expand"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="video-info">
          <h1>{currentVideo.title}</h1>
          <p>{currentModule.title}</p>
        </div>
      </div>

      <div className="video-content">
        <div className="course-curriculum">
          <h2>Course Curriculum</h2>

          <div className="modules-list">
            {course.modules &&
              course.modules.map((module, index) => (
                <div className="module-item" key={index}>
                  <div className="module-header" onClick={() => toggleModule(module.id)}>
                    <div className="module-title">
                      <i className={`fas ${expandedModules[module.id] ? "fa-minus" : "fa-plus"}`}></i>
                      <h4>
                        Module {index + 1}: {module.title}
                      </h4>
                    </div>
                    <div className="module-meta">
                      <span>{module.lectures.length} lectures</span>
                      <span>•</span>
                      <span>{module.duration}</span>
                    </div>
                  </div>

                  {expandedModules[module.id] && (
                    <div className="module-content">
                      {module.lectures &&
                        module.lectures.map((lecture, lectureIndex) => (
                          <Link
                            to={`/video/${course.id}/${module.id}/${lecture.id}`}
                            className={`lecture-item ${Number.parseInt(videoId) === lecture.id ? "active" : ""}`}
                            key={lectureIndex}
                          >
                            <div className="lecture-info">
                              <i className={`fas ${lecture.type === "video" ? "fa-play-circle" : "fa-file-alt"}`}></i>
                              <span className="lecture-title">{lecture.title}</span>
                            </div>
                            <div className="lecture-meta">
                              <span>{lecture.duration}</span>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {showNotes && (
          <motion.div
            className="notes-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notes-header">
              <h2>My Notes</h2>
              <button className="save-notes-btn" onClick={handleSaveNotes}>
                <i className="fas fa-save"></i> Save Notes
              </button>
            </div>

            <textarea
              className="notes-textarea"
              placeholder="Take notes for this lecture..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer

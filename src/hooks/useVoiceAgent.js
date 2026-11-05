import { useEffect, useRef, useState } from 'react'
import { sendAgentMessage } from '../services/agentService.js'

const recognitionErrors = {
  'not-allowed': 'Microphone access was denied. Allow microphone access in your browser settings, then try again.',
  'service-not-allowed': 'Speech recognition is blocked by your browser or its speech service.',
  'audio-capture': 'No microphone is available. Connect a microphone and try again.',
  'no-speech': 'No speech was detected. Try recording again.',
  network: 'The browser speech service could not connect. Check your connection and try again.',
  'language-not-supported': 'English speech recognition is not supported by this browser.',
}

export function useVoiceAgent(agentId) {
  const [transcript, setTranscript] = useState('')
  const [reply, setReply] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const recognitionRef = useRef(null)
  const utteranceRef = useRef(null)
  const activeRef = useRef(false)
  const busyRef = useRef(false)
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const canListen = Boolean(Recognition) && window.isSecureContext
  const canSpeak = Boolean(window.speechSynthesis && window.SpeechSynthesisUtterance)

  useEffect(() => {
    activeRef.current = true
    return () => {
      activeRef.current = false
      const recognition = recognitionRef.current
      if (recognition) {
        recognition.onstart = null
        recognition.onresult = null
        recognition.onerror = null
        recognition.onend = null
        recognition.abort()
      }
      if (utteranceRef.current) {
        utteranceRef.current.onend = null
        utteranceRef.current.onerror = null
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  function startListening() {
    if (busyRef.current) return
    setError('')
    if (!canListen) {
      setError('Speech recognition requires a supported browser and HTTPS or localhost.')
      return
    }

    try {
      const recognition = new Recognition()
      recognitionRef.current = recognition
      recognition.lang = 'en-US'
      recognition.continuous = false
      recognition.interimResults = false
      recognition.onstart = () => setStatus('listening')
      recognition.onresult = (event) => {
        const text = Array.from(event.results)
          .filter((result) => result.isFinal)
          .map((result) => result[0].transcript)
          .join(' ')
        if (text.trim()) setTranscript(text.trim())
      }
      recognition.onerror = (event) => {
        setError(recognitionErrors[event.error] || `Speech recognition failed (${event.error}). Please try again.`)
      }
      recognition.onend = () => {
        recognitionRef.current = null
        busyRef.current = false
        setStatus('idle')
      }
      busyRef.current = true
      setStatus('starting')
      recognition.start()
    } catch (cause) {
      recognitionRef.current = null
      busyRef.current = false
      setStatus('idle')
      setError(cause instanceof Error ? cause.message : 'Unable to start your microphone.')
    }
  }

  function stopListening() {
    try {
      recognitionRef.current?.stop()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to stop speech recognition.')
    }
  }

  function stopSpeaking() {
    if (!utteranceRef.current) return
    utteranceRef.current.onend = null
    utteranceRef.current.onerror = null
    window.speechSynthesis.cancel()
    utteranceRef.current = null
    busyRef.current = false
    setStatus('idle')
  }

  async function sendMessage() {
    if (busyRef.current) return
    busyRef.current = true
    setError('')
    setReply('')
    setStatus('processing')
    try {
      const message = await sendAgentMessage({ agentId, prompt: transcript })
      if (!activeRef.current) return
      setReply(message.content)
      if (!canSpeak) {
        setError('Spoken replies are not supported in this browser. You can read the reply below.')
        busyRef.current = false
        setStatus('idle')
        return
      }
      const utterance = new window.SpeechSynthesisUtterance(message.content)
      utterance.lang = 'en-US'
      utteranceRef.current = utterance
      const finish = () => {
        utteranceRef.current = null
        busyRef.current = false
        setStatus('idle')
      }
      utterance.onend = finish
      utterance.onerror = (event) => {
        setError(`Spoken playback failed (${event.error}). You can read the reply below.`)
        finish()
      }
      setStatus('speaking')
      window.speechSynthesis.speak(utterance)
    } catch (cause) {
      if (!activeRef.current) return
      utteranceRef.current = null
      busyRef.current = false
      setStatus('idle')
      setError(cause instanceof Error ? cause.message : 'Unable to generate a demo reply.')
    }
  }

  return {
    transcript, setTranscript, reply, status, error, canListen, canSpeak,
    startListening, stopListening, sendMessage, stopSpeaking,
  }
}

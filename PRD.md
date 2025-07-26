# 📄 Bookoly API n8n Node – Product Requirements (Markdown PRD)

## Overview

Build a **single custom n8n node** named `Bookoly`, which integrates with Bookoly’s REST API. The node should support **multiple operations** across categories: Sound, Speech, Transcription, Subtitles, and Video.

- Operations are selectable via a dropdown field (`Operation`)
- Each operation has dynamic fields depending on the method
- **API Key authentication** is required (pass via request header)

---

## 🎧 Sound Operations

### 1. Get a specific sound
- **Method:** `GET`
- **Endpoint:** `/api/v1/sounds/{sound}`
- **Params:** `soundId`
- **Restrictions:** None

### 2. Combine multiple sounds
- **Method:** `POST`
- **Endpoint:** `/api/v1/combine-sounds`
- **Body:**
  - `name` (string)
  - `webhook_url` (string)
  - `segment` (array of `{ src }`)
- **Restrictions:** None

### 3. Create a sound effect
- **Method:** `POST`
- **Endpoint:** `/api/v1/create-sound-effect`
- **Body:**
  - `sound.name` (string)
  - `sound.webhook_url` (string)
  - `sound.text_prompt` (max 400 chars)
  - `sound.duration_in_sec` (min 0.5)
  - `sound.publish_now` (boolean)
  - `sound.narration_voice` (optional)
- **Restrictions:** `text_prompt ≤ 400 chars`, `duration_in_sec ≥ 0.5`

---

## 🗣️ Speech Operations

### 4. Get a specific speech
- **Method:** `GET`
- **Endpoint:** `/api/v1/speeches/{speech}`
- **Params:** `speechId`
- **Restrictions:** None

### 5. Create speech synthesis
- **Method:** `POST`
- **Endpoint:** `/api/v1/text-to-speech`
- **Body:**
  - `name` (string)
  - `text` (string)
  - `webhook_url` (string)
  - `voice.vendorId` (required)
- **Restrictions:** `vendorId` must be valid

---

## 📝 Transcription Operations

### 6. Get a specific transcript
- **Method:** `GET`
- **Endpoint:** `/api/v1/transcripts/{transcript}`
- **Params:** `transcriptId`
- **Restrictions:** None

### 7. Transcribe audio/video
- **Method:** `POST`
- **Endpoint:** `/api/v1/create-transcript`
- **Body:**
  - `name` (string)
  - `webhook_url` (string)
  - `language` (string)
  - `translation_language` (optional)
  - `transcription` (boolean)
- **Restrictions:** Valid `language` and `translation_language` codes

---

## 💬 Subtitle File Operations

### 8. Get a specific subtitle file
- **Method:** `GET`
- **Endpoint:** `/api/v1/subtitleFiles/{subtitle}`
- **Params:** `subtitleFileId`
- **Restrictions:** None

### 9. Create subtitle file
- **Method:** `POST`
- **Endpoint:** `/api/v1/generate-subtitle-file`
- **Body:**
  - `subtitle.name` (string)
  - `subtitle.type` (e.g., `"ass"`)
  - `subtitle.url` (media URL)
  - `subtitle.webhook_url`
  - `subtitle.style` (preset name)
  - `subtitle.language`
  - `subtitle.transcript_id`
  - `subtitle.video_id` (optional)
  - `subtitle.srt` (boolean)
  - `subtitle.start_at` (number)
  - `subtitle.resume` (boolean)
- **Restrictions:** Valid `type`, `style`

---

## 🎬 Video Operations

### 10. Get a specific video
- **Method:** `GET`
- **Endpoint:** `/api/v1/videos/{video}`
- **Params:** `videoId`
- **Restrictions:** None

### 11–25. Various video editing operations

- **Endpoints & Bodies** include operations such as:
  - Add audio
  - Add subtitles (from transcript or file)
  - Generate AI videos
  - Mute, clip, crop, frame, rotate, blur
  - Extract audio
  - Add watermark
  - Scene splitting

---

## 🔐 Authentication

All endpoints require an **API key**:
- Send in `Authorization` header: `Bearer YOUR_API_KEY`
- Or configure a dedicated `Credential` section in n8n for user input
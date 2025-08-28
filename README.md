# n8n-nodes-bookoly

This is an n8n community node. It lets you use bookoly in your n8n workflows.

bookoly is a service that makes it easy to create, edit, and process your content automatically.
With bookoly, you can generate slideshows, add subtitles, create voice-overs, split videos into multiple scenes, and 
a lot more — all through a simple API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### 🎞️ Video

* **Add Audio to a Video** – Add background music or a voice-over to a video.
* **Add Audio with Subtitles to a Video** – Add a voice-over and automatically generate and add subtitles from the audio.
* **Add Subtitles to a Video** – Automatically generate subtitles from the video’s audio and insert them into the file.
* **Add Subtitles to a Video from a File** – Import and embed an external subtitle file (e.g. `.srt`, `.ass`) into a video.
* **Add Watermark to a Video** – Overlay an image or text watermark onto a video.
* **Blur a Video** – Apply a blur effect to the entire video or selected regions.
* **Clip a Video** – Extract a specific section of a video by start time and duration.
* **Create a Slideshow** – Generate a slideshow video from multiple images and video clips.
* **Crop a Video** – Trim away unwanted edges of a video by defining crop dimensions.
* **Extract Audio from a Video** – Save the audio track of a video as a separate sound file.
* **Frame a Video** – Capture a single image from a video at the desired timestamp.
* **Generate a Video** – Create a video from images and video clips with a voice-over and subtitles.
* **Mute a Video** – Set the volume of a video to 0%.
* **Rotate a Video** – Rotate a video by 90, 180, or 270 degrees.
* **Split a Video into Scenes** – Split a video by automatic scene detection, fixed time intervals, or equal segments.

### 🗣️ Speech

* **Create a Speech Synthesis** – Convert text into a natural-sounding speech with AI.

### 📜 Transcript

* **Transcribe Media** – Automatically transcribe the audio from a video or audio file.

### 🎼 Sound

* **Combine Sounds** – Merge two or more audio files into a single track.
* **Create a Sound Effect** – Generate a custom sound effect with AI.

### 📂 File

* **Generate a Subtitle File** – Create a subtitle file (e.g. `.srt`, `.vtt`) from a video or audio file.

## Credentials

To use the bookoly node, you need an API token:

1. Sign up for an account at [bookoly](https://bookoly.com).
2. Open your profile from the left menu and scroll down to the API Tokens section.
3. Create a new API token. 
   * Enable all permissions.
   * (Optional) Set an expiration date.
4. Copy the token and store it in a safe place.
5. In n8n, create new credentials for bookoly and paste your token.

## Compatibility

* Minimum n8n version: 1.106.3
* Tested with: n8n 1.106.3+
* Known issues: None at this time.

## Usage

Once installed, you can add the bookoly node to your workflow to automate content generation and processing.

📺 To see all examples in action check out the full bookoly YouTube tutorial [playlist](https://www.youtube.com/playlist?list=PLaZXufV_18nEe7EG_HNwwbd7f6lCbNL_g)

If you’re new to n8n, check the [Try it out](https://docs.n8n.io/try-it-out/) guide

## Resources

* [bookoly api docs](https://bookoly.com/app/docs/v1/api#/)
* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## Version history

1.0.1
* Removed lodash dependency.

1.0.0
* Initial release with support for all bookoly operations.



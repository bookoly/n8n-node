import { INodeProperties } from 'n8n-workflow';

export interface ResourceDefinition {
	displayName: string;
	value: ResourceType;
	description: string;
	operations: INodeProperties[];
	parameters: INodeProperties[];
}

export interface Option {
	name: string;
	value: string;
}

export interface Scene {
	type: 'image' | 'video';
	src: string;
	duration: number | null;
	effect: '' | 'zoom_in';
}

export interface SceneCollection {
	scenes: Scene[];
}

export interface BookolyScene {
	asset: {
		type: 'image' | 'video';
		src: string;
	};
	duration: number | null;
	effect: '' | 'zoom_in';
}
export enum ApiVersion {
	V1 = 'v1',
	V2 = 'v2',
}

export enum ResourceType {
	SOUND = 'sound',
	SPEECH = 'speech',
	SPEECH_DIALOGUE = 'speech_dialogue',
	FILE = 'file',
	TRANSCRIPT = 'transcript',
	VIDEO = 'video',
}

export enum ResourceState {
	COMPLETED = 'completed',
	FAILED = 'failed',
}

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
}

export enum ApiEndpoints {
	ADD_AUDIO_WITH_SUBTITLE_TO_VIDEO = 'add-audio-with-subtitle-to-video',
	ADD_AUDIO_TO_VIDEO = 'add-audio-to-video',
	ADD_SUBTITLE_TO_VIDEO = 'add-subtitle-to-video',
	ADD_SUBTITLE_TO_VIDEO_FROM_FILE = 'add-subtitle-to-video-from-file',
	ADD_WATERMARK_TO_VIDEO = 'add-watermark-to-video',
	ASSETS_TO_VIDEO = 'assets-to-video',
	AUTH_CHECK = 'auth-check',
	BLUR_A_VIDEO = 'blur-a-video',
	CLIP_A_VIDEO = 'clip-a-video',
	COMBINE_SOUNDS = 'combine-sounds',
	CREATE_SOUND_EFFECT = 'create-sound-effect',
	CREATE_SPEECH_DIALOGUE = 'create-speech-dialogue',
	CREATE_TRANSCRIPT = 'create-transcript',
	CROP_A_VIDEO = 'crop-a-video',
	EXTRACT_AUDIO_FROM_VIDEO = 'extract-audio-from-video',
	FRAME_A_VIDEO = 'frame-a-video',
	GENERATE_A_VIDEO = 'generate-a-video',
	GENERATE_SUBTITLE_FILE = 'generate-subtitle-file',
	MUTE_A_VIDEO = 'mute-a-video',
	ROTATE_A_VIDEO = 'rotate-a-video',
	SOUNDS = 'sounds',
	SPEECHES = 'speeches',
	SPEECH_DIALOGUES = 'speechDialogues',
	SPLIT_VIDEO_INTO_SCENES = 'split-video-into-scenes',
	SUBTITLE_FILES = 'subtitleFiles',
	TEXT_TO_SPEECH = 'text-to-speech',
	TRANSCRIPTS = 'transcripts',
	VIDEOS = 'videos',
}

export enum VideoAction {
	ADD_AUDIO_TO_VIDEO = 'addAudioToVideo',
	ADD_AUDIO_WITH_SUBTITLES_TO_VIDEO = 'addAudioWithSubtitlesToVideo',
	ADD_SUBTITLES_TO_VIDEO_FROM_FILE = 'addSubtitlesToVideoFromFile',
	ADD_SUBTITLES_TO_VIDEO = 'addSubtitlesToVideo',
	ADD_WATERMARK_TO_VIDEO = 'addWatermarkToVideo',
	BLUR_VIDEO = 'blurVideo',
	CLIP_VIDEO = 'clipVideo',
	CREATE_SLIDESHOW = 'createSlideshow',
	CROP_VIDEO = 'cropVideo',
	EXTRACT_AUDIO_FROM_VIDEO = 'extractAudioFromVideo',
	FRAME_VIDEO = 'frameVideo',
	GENERATE_VIDEO = 'generateVideo',
	GET_VIDEO = 'getVideo',
	MUTE_VIDEO = 'muteVideo',
	ROTATE_VIDEO = 'rotateVideo',
	SPLIT_VIDEO_INTO_SCENES = 'splitVideoIntoScenes',
}

export enum SoundAction {
	COMBINE_SOUNDS = 'combineSounds',
	CREATE_SOUND_EFFECT = 'createSoundEffect',
	GET_SOUND = 'getSound',
}

export enum SpeechAction {
	CREATE_SPEECH = 'createSpeech',
	GET_SPEECH = 'getSpeech',
}

export enum SpeechDialogueAction {
	CREATE_SPEECH_DIALOGUE = 'createSpeechDialogue',
	GET_SPEECH_DIALOGUE = 'getSpeechDialogue',
}

export enum TranscriptAction {
	CREATE_TRANSCRIPT = 'createTranscript',
	GET_TRANSCRIPT = 'getTranscript',
}

export enum SubtitleFileAction {
	GENERATE_SUBTITLE_FILE = 'generateSubtitleFile',
	GET_SUBTITLE_FILE = 'getSubtitleFile',
}

export enum SubtitleFileType {
	ASS = 'ass',
}

export enum SubtitleStyle {
	SIMPLE = 'simple',
	SIGNAL = 'signal',
	RAINBOW = 'rainbow',
	HIGHLIGHT_CURRENT_WORD = 'highlight_current_word',
	SIGNAL_HIGHLIGHT_CURRENT_WORD = 'signal_highlight_current_word',
	RAINBOW_HIGHLIGHT_CURRENT_WORD = 'rainbow_highlight_current_word',
}

export enum FontFamily {
	ARIAL = 'Arial',
	CHARM = 'Charm',
	EAGLE_LAKE = 'Eagle Lake',
	LIBRE_BASKERVILLE = 'Libre Baskerville',
	LOBSTER = 'Lobster',
	LUCKIEST_GUY = 'Luckiest Guy',
	MARCK_SCRIPT = 'Marck Script',
	NANUM_PEN_SCRIPT = 'Nanum Pen Script',
	NUNITO = 'Nunito',
	PACIFICO = 'Pacifico',
	ROBOTO = 'Roboto',
	KOREAN = 'Korean',
	KOREAN_BOLD = 'Korean Bold',
	CHINESE_SIMPLIFIED = 'Chinese Simplified',
	CHINESE_TRADITIONAL = 'Chinese Traditional',
}

export enum SubtitlePosition {
	TOP_LEFT = 'top_left',
	TOP_CENTER = 'top_center',
	TOP_RIGHT = 'top_right',
	CENTER_LEFT = 'center_left',
	CENTER_CENTER = 'center_center',
	CENTER_RIGHT = 'center_right',
	BOTTOM_LEFT = 'bottom_left',
	BOTTOM_CENTER = 'bottom_center',
	BOTTOM_RIGHT = 'bottom_right',
	MID_TOP_CENTER = 'mid_top_center',
	MID_BOTTOM_CENTER = 'mid_bottom_center',
}

export enum TextCase {
	DEFAULT = 'default',
	LOWERCASE = 'lowercase',
	UPPERCASE = 'uppercase',
}

export enum Source {
	NONE = 'none',
	SPEECH = 'speech',
	VIDEO_AUDIO = 'video_audio',
}

export enum VideoResolution {
	HORIZONTAL_HD = 'horizontal_hd',
	HORIZONTAL_2K = 'horizontal_2k',
	HORIZONTAL_4K = 'horizontal_4k',
	VERTICAL_HD = 'vertical_hd',
	VERTICAL_2K = 'vertical_2k',
	VERTICAL_4K = 'vertical_4k',
	SQUARE_HD = 'square_hd',
	SQUARE_2K = 'square_2k',
	SQUARE_4K = 'square_4k',
}

export enum DurationBasis {
	AUDIO = 'audio',
	SPEECH = 'speech',
	VIDEO = 'video',
}

export enum TranslationLanguage {
	NONE = '',
	AR = 'ar',
	BN = 'bn',
	CA = 'ca',
	ZH_HANS = 'zh-Hans',
	ZH_HANT = 'zh-Hant',
	DA = 'da',
	NL = 'nl',
	EN = 'en',
	FI = 'fi',
	FR = 'fr',
	DE = 'de',
	EL = 'el',
	HI = 'hi',
	HI_LATN = 'hi-Latn',
	ID = 'id',
	IT = 'it',
	JA = 'ja',
	KO = 'ko',
	MS = 'ms',
	ZH = 'zh',
	PT = 'pt',
	PT_BR = 'pt-BR',
	RU = 'ru',
	ES = 'es',
	ES_419 = 'es-419',
	SV = 'sv',
	TH = 'th',
	TR = 'tr',
	UK = 'uk',
	VI = 'vi',
}

export enum Language {
	AF = 'af',
	AR = 'ar',
	HY = 'hy',
	AZ = 'az',
	BE = 'be',
	BS = 'bs',
	BG = 'bg',
	CA = 'ca',
	ZH = 'zh',
	HR = 'hr',
	CS = 'cs',
	DA = 'da',
	NL = 'nl',
	EN = 'en',
	ET = 'et',
	FI = 'fi',
	FR = 'fr',
	GL = 'gl',
	DE = 'de',
	EL = 'el',
	HE = 'he',
	HI = 'hi',
	HU = 'hu',
	IS = 'is',
	ID = 'id',
	IT = 'it',
	JA = 'ja',
	KN = 'kn',
	KK = 'kk',
	KO = 'ko',
	LV = 'lv',
	LT = 'lt',
	MK = 'mk',
	MS = 'ms',
	MR = 'mr',
	MI = 'mi',
	NE = 'ne',
	NO = 'no',
	FA = 'fa',
	PL = 'pl',
	PT = 'pt',
	RO = 'ro',
	RU = 'ru',
	SR = 'sr',
	SK = 'sk',
	SL = 'sl',
	ES = 'es',
	SW = 'sw',
	SV = 'sv',
	TL = 'tl',
	TA = 'ta',
	TH = 'th',
	TR = 'tr',
	UK = 'uk',
	UR = 'ur',
	VI = 'vi',
	CY = 'cy',
}

export enum Voice {
	ACHERNAR = 'Achernar',
	ACHIRD = 'Achird',
	ALGENIB = 'Algenib',
	ALGIEBA = 'Algieba',
	ALLOY = 'alloy',
	ALNILAM = 'Alnilam',
	AOEDE = 'Aoede',
	ASH = 'ash',
	AUTONOE = 'Autonoe',
	CALLIRRHOE = 'Callirrhoe',
	CHARON = 'Charon',
	CORAL = 'coral',
	DESPINA = 'Despina',
	ECHO = 'echo',
	ENCELADUS = 'Enceladus',
	ERINOME = 'Erinome',
	FABLE = 'fable',
	FENRIR = 'Fenrir',
	GACRUX = 'Gacrux',
	IAPETUS = 'Iapetus',
	KORE = 'Kore',
	LAOMEDEIA = 'Laomedeia',
	LEDA = 'Leda',
	NOVA = 'nova',
	ONYX = 'onyx',
	ORUS = 'Orus',
	PUCK = 'Puck',
	PULCHERRIMA = 'Pulcherrima',
	RASALGETHI = 'Rasalgethi',
	SADACHBIA = 'Sadachbia',
	SADALTAGER = 'Sadaltager',
	SAGE = 'sage',
	SCHEDAR = 'Schedar',
	SHIMMER = 'shimmer',
	SULAFAT = 'Sulafat',
	UMBRIEL = 'Umbriel',
	VINDEMATRIX = 'Vindemiatrix',
	ZEPHYR = 'Zephyr',
	ZUBENELGENUBI = 'Zubenelgenubi',
}

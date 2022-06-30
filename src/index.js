import './style.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Body = document.body;
const TimeEl = document.querySelector('.time');
const DateEl = document.querySelector('.date');
const GreetingEl = document.querySelector('.greeting');
const NameEl = document.querySelector('.name');
const SlidePrevEl = document.querySelector('.slide-prev');
const SlideNextEl = document.querySelector('.slide-next');
let date = new Date();
let hours = date.getHours();

let randomNum;
let slideNum;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DATE TIME AND GREETING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DATE TIME AND GREETING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DATE TIME AND GREETING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function setTime() {
	const innerDate = new Date();
	const options = { weekday: 'long', month: 'long', day: 'numeric' };
	DateEl.textContent = `${innerDate.toLocaleDateString('en-En', options)}`;
	TimeEl.textContent = `${innerDate.toLocaleTimeString()}`;

	setGreeting();
	setTimeout(setTime, 1000);
}

function setTimeOfDay() {
	return hours >= 6 && hours < 12 ? 'morning' :
		hours >= 12 && hours < 18 ? 'afternoon' :
			hours >= 18 && hours != 0 ? 'evening' :
				hours >= 0 && hours < 6 ? 'night' : 0;
}

function setGreeting() {
	GreetingEl.textContent = `Good ${setTimeOfDay()}, `;
}

setTime();

function setNamePlaceholder() {
	if (!NameEl.value) {
		NameEl.placeholder = '[Enter your name]';
	}
}

setNamePlaceholder();

function setLocalName() {
	NameEl.value ? localStorage.setItem('name', NameEl.value) : 0;
}

window.addEventListener('beforeunload', setLocalName);

function getLocalName() {
	localStorage.getItem('name') ? NameEl.value = localStorage.getItem('name') : 0;
}

window.addEventListener('load', getLocalName);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RANDOM BACKGROUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RANDOM BACKGROUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RANDOM BACKGROUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function getRandomNum(min = 1, max = 20) {
	min = Math.ceil(min);
	max = Math.floor(max);
	randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
	return String(randomNum).length != 2 ?
		`0${randomNum}` :
		`${randomNum}`;
}


function setRandomBackground(random = getRandomNum(1, 20)) {
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${setTimeOfDay()}/${String(random).length < 2 ? '0' + random : random}.jpg`;
	img.onload = () => {
		Body.style.backgroundImage = `url(${img.src})`;
	}
	slideNum = Number(random);
	console.log(slideNum);
}
// console.log(getRandomNum(1, 20));
setRandomBackground();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function slideNext() {
	// setTimeout(() => {
	// }, 600);
	// console.log(randomNum);

	slideNum < 20 ?
		slideNum += 1 :
		slideNum = 1;
	setRandomBackground(slideNum)
}

function slidePrev() {
	// setTimeout(() => {
	// console.log(slideNum);
	// }, 600);
	if (slideNum == 1) {
		slideNum--;
		slideNum = 20;
	} else {
		slideNum--
	}
	// slideNum == 1 ?
	//     slideNum -= 1 :
	//     slideNum = 20;
	setRandomBackground(slideNum);
}
const SliderButtonsEl = document.querySelectorAll('.slider-icon');

function setDisableOnButtons(isDisabled = false) {
	if (isDisabled) {
		SliderButtonsEl.forEach(item => item.setAttribute('disabled', false));
		isDisabled = !isDisabled;
	} else {
		SliderButtonsEl.forEach(item => item.setAttribute('disabled', true));
		isDisabled = !isDisabled;
	}
}

SlideNextEl.addEventListener('click', slideNext);
SlidePrevEl.addEventListener('click', slidePrev);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WEATHER WIDGET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WEATHER WIDGET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WEATHER WIDGET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Body.addEventListener('transitionrun', setDisableOnButtons);
// Body.addEventListener('transitionend', setDisableOnButtons);
const WeatherIcon = document.querySelector('.weather-icon');
const WeatherTemp = document.querySelector('.temperature');
const WeatherDescription = document.querySelector('.weather-description');
const WeatherWind = document.querySelector('.wind');
const WeatherHumidity = document.querySelector('.humidity');
const WeatherError = document.querySelector('.weather-error');
const UserCity = document.querySelector('.city');
let city = 'Minks';
async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city') ? localStorage.getItem('city') : city}&lang=en&appid=1fa6367936b78d680978c5dbbeed29f7&units=metric`;
	const response = await fetch(url).then(response => {
		if (response.ok) {
			WeatherIcon.style.display = 'block';
			WeatherWind.style.display = 'block';
			WeatherDescription.style.display = 'block';
			WeatherHumidity.style.display = 'block';
			WeatherTemp.style.display = 'block';
			WeatherError.style.display = 'none';
			return response;
		} else {
			WeatherIcon.style.display = 'none';
			WeatherWind.style.display = 'none';
			WeatherDescription.style.display = 'none';
			WeatherHumidity.style.display = 'none';
			WeatherTemp.style.display = 'none';
			WeatherError.style.display = 'block';
			WeatherError.textContent = 'Invalid city';
		}
	});
	const data = await response.json();

	localStorage.setItem('city', UserCity.value);

	WeatherIcon.className = 'weather-icon owf';
	WeatherIcon.classList.add(`owf-${data.weather[0].id}`);
	WeatherTemp.textContent = `${Math.ceil(data.main.temp)}°C`;
	WeatherDescription.textContent = `${data.weather[0].description.toUpperCase()}`;
	WeatherWind.textContent = `Wind: ${Math.ceil(data.wind.speed)} m/s`.toUpperCase();
	WeatherHumidity.textContent = `Humidity: ${data.main.humidity}%`.toUpperCase();
}

function setCity() {
	city = UserCity.value;
	localStorage.setItem('city', UserCity.value);
}

function setCityPlaceholder() {
	if (!UserCity.value) {
		UserCity.placeholder = '[Enter your city]';
	}
}

setCityPlaceholder();

function getCityFromStorage() {
	UserCity.value = localStorage.getItem('city');
}

window.addEventListener('load', getCityFromStorage);
window.addEventListener('load', getWeather);

UserCity.addEventListener('change', setCity);
UserCity.addEventListener('change', getWeather);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!QUOTE OF THE DAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!QUOTE OF THE DAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!QUOTE OF THE DAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const QuoteEl = document.querySelector('.quote');
const AuthorEl = document.querySelector('.author');
const ChangeQuoteBtn = document.querySelector('.change-quote');

async function getQuote() {
	const url = './data/quotes.json';
	const response = await fetch(url);
	const data = await response.json();

	function getRandomQuote() {
		let index = Number(getRandomNum(0, 95));

		QuoteEl.textContent = `"${data[index]['quote']}"`;
		AuthorEl.textContent = `- ${data[index]['author']}`;
	}

	getRandomQuote();

	ChangeQuoteBtn.addEventListener('click', getRandomQuote);
}

getQuote();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const AudioEl = document.querySelector('.audio');
const TrackDuration = document.querySelector('.duration');
const PlayBtn = document.querySelector('.play');
const PlayNextBtn = document.querySelector('.play-next');
const PlayPrevBtn = document.querySelector('.play-prev');
const PlaylistEl = document.querySelector('.play-list');
const PlaylistBtn = document.querySelector('.play-list-btn');
const ProgressBar = document.querySelector('.progress');
const VolumeBtn = document.querySelector('.mute-btn');
const VolumeBar = document.querySelector('.volume');
const OpenPlayerBtn = document.querySelector('.open-player');
const PlayerEl = document.querySelector('.player');
let isPlay = false;
let trackNum = 0;

const Playlist = [
	{
		url: './assets/sounds/Aqua Caelestis.mp3',
		name: 'Aqua Caelestis',
	},
	{
		url: './assets/sounds/Ennio Morricone.mp3',
		name: 'Ennio Morricone',
	},
	{
		url: './assets/sounds/River Flows In You.mp3',
		name: 'River Flows In You',
	},
	{
		url: './assets/sounds/Summer Wind.mp3',
		name: 'Summer Wind',
	},
];

function toggleAudio() {
	if (isPlay) {
		AudioEl.pause();
		PlayBtn.style.backgroundImage = 'url(./assets/svg/play.svg)';
		isPlay = !isPlay;
	} else {
		AudioEl.play();
		PlayBtn.style.backgroundImage = 'url(./assets/svg/pause.svg)';
		styleCurrentTrack();
		isPlay = !isPlay;
	}
}



function countTrackNum() {
	if (trackNum < 0) {
		trackNum = Playlist.length - 1;
	} else if (trackNum > Playlist.length - 1) {
		trackNum = 0;
	}
}

function styleCurrentTrack() {
	// PlaylistEl.children[trackNum - 1].classList.toggle('current-track');
	PlaylistEl.children[trackNum].classList.add('current-track');
}

function removeTrackStyle() {
	PlaylistEl.children[trackNum - 1].classList.remove('current-track');
}

function switchNextTrack() {
	trackNum++;
	countTrackNum();
	AudioEl.src = `${Playlist[trackNum].url}`;
	AudioEl.play();
	removeTrackStyle();
	styleCurrentTrack();
}

function switchPrevTrack() {
	trackNum--;
	countTrackNum();
	AudioEl.src = `${Playlist[trackNum].url}`;
	removeTrackStyle();
	styleCurrentTrack();
}

function playInfinite() {
	switchNextTrack();
}
// function switchTrack(e) {
//     if (e.target.classList.contains('play-next')) {
//         trackNum++;
//         countTrackNum();
//         AudioEl.src = `${Playlist[trackNum].url}`;
//     } else if (e.target.classList.contains('play-prev')) {
//         trackNum--;
//         countTrackNum();
//         AudioEl.src = `${Playlist[trackNum].url}`;
//     };
// }

function showDuration(current = AudioEl.currentTime, duration = AudioEl.duration) {
	const progress = Math.round(current) / 60 >= 1
		? `${Math.round(Math.round(current) / 60)}:${Math.round(current) - 60}`
		: `0:${Math.round}`;



	if (Math.round(current) / 60 >= 1) {
		return `${Math.round(Math.round(current) / 60)}:${Math.round(current) - 60} / ${Math.round(Math.round(AudioEl.duration) / 60)}:${Math.round(AudioEl.duration)}`;
	} else {

		return `0:${Math.round(AudioEl.currentTime) < 10 ? '0' + Math.round(AudioEl.currentTime) : Math.round(AudioEl.currentTime)} / 0:${Math.round(AudioEl.duration)}`;
	}
}

function loadSetUp() {
	TrackDuration.textContent = `0:${Math.round(AudioEl.currentTime) < 10 ? '0' + Math.round(AudioEl.currentTime) : Math.round(AudioEl.currentTime)} / 0:${Math.round(AudioEl.duration)}`;

}

window.addEventListener('load', loadSetUp);

function updateProgress() {
	const percent = (AudioEl.currentTime / AudioEl.duration) * 100;
	loadSetUp();
	ProgressBar.style.background = 'linear-gradient(to right, #ffffff 0%, #ffffff ' + percent + '%, #C4C4C4 ' + percent + '%, #C4C4C4 100%)';
	ProgressBar.value = percent;
}

function isEnd() {
	playInfinite();
}

function grabTime() {
	const percent = ProgressBar.value;
	ProgressBar.style.background = 'linear-gradient(to right, #ffffff 0%, #ffffff ' + percent + '%, #C4C4C4 ' + percent + '%, #C4C4C4 100%)';
	AudioEl.currentTime = (AudioEl.duration / ProgressBar.max) * ProgressBar.value;
}

function updateVolume() {
	VolumeBar.style.background = 'linear-gradient(to right, #ffffff 0%, #ffffff ' + VolumeBar.value + '%, #C4C4C4 ' + VolumeBar.value + '%, #C4C4C4 100%)'
	AudioEl.volume = VolumeBar.value / 100;
	if (VolumeBar.value == 0) {
		VolumeBtn.style.backgroundImage = 'url(./assets/svg/mute.svg)';
	} else {
		VolumeBtn.style.backgroundImage = 'url(./assets/svg/volume.svg)';
	}
}

function isMute() {
	if (VolumeBar.value != 0) {
		AudioEl.muted = true;
		VolumeBar.value = 0;
		VolumeBtn.style.backgroundImage = 'url(./assets/svg/mute.svg)';
		updateVolume();
	} else {
		AudioEl.muted = false;
		VolumeBar.value = sessionStorage.getItem('volume');
		VolumeBtn.style.backgroundImage = 'url(./assets/svg/volume.svg)';
		updateVolume();
	}
}

function createPlaylist() {

	Playlist.forEach((item) => {
		let playlistItem = document.createElement('div');
		playlistItem.classList.add('playlistItem');
		let smallTrackName = document.createElement('li');
		let smallPlayBtn = document.createElement('button');
		let smallTrackDuration = document.createElement('p');
		smallPlayBtn.classList.add('smallPlayBtn');


		smallPlayBtn.style.backgroundImage = './assets/svg/play.svg';
		smallTrackName.textContent = `${item.name}`;
		smallTrackName.style.listStyle = 'none';

		PlaylistEl.append(playlistItem);
		playlistItem.append(smallPlayBtn);
		playlistItem.append(smallTrackName);
		playlistItem.append(smallTrackDuration);


	})
}

createPlaylist();
let isPlayerOpen = true;

function openPlayer() {
	if (isPlayerOpen) {
		OpenPlayerBtn.style.transform = 'rotate(360deg)';
		PlayerEl.classList.remove('hidePlayer');
		PlayerEl.classList.add('showPlayer');
		PlayerEl.style.display = 'flex';


	} else {
		OpenPlayerBtn.style.transform = 'rotate(0deg)';
		PlayerEl.classList.add('hidePlayer');
		PlayerEl.classList.remove('showPlayer');


	}
	isPlayerOpen = !isPlayerOpen;
}

let isPlaylistOpen = false;

function openPlaylist() {
	!isPlaylistOpen ?
		PlaylistEl.style.display = 'flex' :
		PlaylistEl.style.display = 'none';
	isPlaylistOpen = !isPlaylistOpen;
}

PlayBtn.addEventListener('click', toggleAudio);
PlayNextBtn.addEventListener('click', switchNextTrack);
PlayPrevBtn.addEventListener('click', switchPrevTrack);
AudioEl.addEventListener('timeupdate', updateProgress);
ProgressBar.addEventListener('input', grabTime);
AudioEl.addEventListener('ended', isEnd);
VolumeBtn.addEventListener('click', isMute);
VolumeBar.addEventListener('input', updateVolume);
// OpenPlayerBtn.addEventListener('click', openPlayer);
PlaylistBtn.addEventListener('click', openPlaylist);
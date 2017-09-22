import {h, render} from 'preact';
// import axois from 'axois';
import './hack.css'

const contentId = document.getElementById('site-content').getAttribute('data-content-id');

const FTLiveItem = ({meta, url, imageSrc, body}) => (
	<li class="o-teaser-collection__item">
		<div class="o-teaser o-teaser--small o-teaser--article o-teaser--verify-syndicatable" data-o-component="o-teaser" data-trackable="teaser">
			<div class="o-teaser__content">

				{meta && (
					<div class="o-teaser__meta">
							<span class="o-teaser__tag" data-trackable="primary-concept">
								{meta}
							</span>
					</div>
				)}

					<img role="presentation" alt="" class="hack-image__image" src={imageSrc} />
	
				<div class="o-teaser__heading js-teaser-heading">
					<a href={url} class="js-teaser-heading-link" data-trackable="main-link">
						{body}
					</a>
				</div>
			</div>
		</div>
	</li>
);

const TeaserHeading = ({text, url}) => (
	<div class="o-teaser-collection__heading o-teaser-collection__heading--small">
		<a href={url} data-trackable="section-title">{text}</a>
	</div>
);

const TeaserCollection = (props) => (
	<div class="hack-teaser__collection o-teaser-collection" role="group" data-trackable="suggested-reads">
		{props.heading}
		<ol class="o-teaser-collection__items">
			{props.children}
		</ol>
	</div>
);

const stubData = [
	{
		body: 'My best event',
		meta: 'Super event time',
		url: 'https://live.ft.com/Events/2017/FT-Women-At-The-Top',
		imageSrc: 'https://live.ft.com/var/ftlive/storage/images/events/2017/ft-women-at-the-top/817085-5-eng-GB/FT-Women-At-The-Top_eventcardimage.jpg'
	},
	{
		body: 'Not so good event',
		meta: 'Oh no what a bad event',
		url: 'https://live.ft.com/Events/2017/FT-Innovative-Lawyers-Awards-Europe-2017',
		imageSrc: 'https://live.ft.com/var/ftlive/storage/images/events/2017/ft-innovative-lawyers-awards-europe-2017/813037-6-eng-GB/FT-Innovative-Lawyers-Awards-Europe-2017_eventcardimage.png'
	}
];

// const {data: liveData} = await axios.get('/magic-api-url', {
	// params: {
	// 	contentId
	// }
// });


render((
   	<TeaserCollection 
   		heading={<TeaserHeading text="Financial Times Live Events" url="https://live.ft.com" />}
   	>
	   {stubData.map((data) => (
	   		<FTLiveItem 
	   			{...data}
	   		/>
	   ))}
	</TeaserCollection>
), document.getElementById('hack-root'));

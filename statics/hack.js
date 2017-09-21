import {h, render} from 'preact';
import axois from 'axois';
import './hack.css'

const contentId = document.getElementById('site-content').getAttribute('data-content-id');

const FTLiveItem = (props) => (
	<li class="o-teaser-collection__item">
		<div class="o-teaser o-teaser--small o-teaser--article o-teaser--verify-syndicatable" data-o-component="o-teaser" data-trackable="teaser">
			<div class="o-teaser__content">

				{props.meta && (
					<div class="o-teaser__meta">
							<a href="https://www.ft.com/fastft" class="o-teaser__tag" data-trackable="primary-concept">
								{props.meta}
							</a>
					</div>
				)}

				<div>	
					<div class="n-image-wrapper o-teaser__image-placeholder n-image-wrapper--placeholder">
						<img role="presentation" alt="" class="hack-image" src={props.imageSrc} />
					</div>
				</div>
	
				<div class="o-teaser__heading js-teaser-heading">
					<a href={props.url} class="js-teaser-heading-link" data-trackable="main-link">
						{props.body }
					</a>
				</div>
			</div>
		</div>
	</li>
);

const TeaserHeading = (props) => (
	<div class="standalone-teaser-heading">Read next</div>
);

const TeaserCollection = (props) => (
	<div class="o-teaser-collection" role="group" data-trackable="suggested-reads">
		<div class="o-teaser-collection__heading o-teaser-collection__heading--small">
				<a href="https://www.ft.com/topics/themes/Global_terror" data-trackable="section-title">{props.heading}</a>
		</div>
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
		imageSrc: '/var/ftlive/storage/images/events/2017/ft-innovative-lawyers-awards-europe-2017/813037-6-eng-GB/FT-Innovative-Lawyers-Awards-Europe-2017_eventcardimage.png'
	}
];

// const {data: liveData} = await axios.get('/magic-api-url', {
	// params: {
	// 	contentId
	// }
// });


render((
   	<TeaserCollection heading="Financial Times Live Events">
	   {stubData.map((data) => (
	   		<FTLiveItem 
	   			{...data}
	   		/>
	   ))}
	</TeaserCollection>
), document.getElementById('hack-root'));

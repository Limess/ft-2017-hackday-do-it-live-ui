import {h, render} from 'preact';
import './hack.css'

const contentId = document.getElementById('site-content').getAttribute('data-content-id');

const FTLiveItem = ({location, url, imageSrc, body}) => (
	<li class="o-teaser-collection__item">
		<div class="o-teaser o-teaser--small o-teaser--article o-teaser--verify-syndicatable" data-o-component="o-teaser" data-trackable="teaser">
			<div class="o-teaser__content">

				{location && (
					<div class="o-teaser__meta">
							<span class="o-teaser__tag" data-trackable="primary-concept">
								{location}
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
	    "uri": "https://live.ft.com/Events/2018/FT-Digital-Health-Summit-Europe",
	    "categories": [
	        "Healthcare&LifeSciences"
	    ],
	    "title": "FT Digital Health Summit Europe",
		"imageSrc": 'https://live.ft.com/var/ftlive/storage/images/events/2017/ft-digital-health-summit-usa/816896-4-eng-GB/FT-Digital-Health-Summit-USA_eventcardimage.png',
	    "location": "London",
	    "date": "2018-06-19T00:00:00.000+01:00",
	    "speakers": [],
	    "description": "Assess how patients are being empowered and further involved in the transformation of healthcareHear how collaborations between pharma and big tech are enriching the commercial viability of digital healthMeet and greet with the full array of industry stakeholders, from healthcare to technology, pharma to start-ups, regulation to governmentIdentify solutions in overcoming cyber security threats in digital healthDon't get left behind - be part of a must-attend event mapping the continued transformation of healthcare\n    \n        FT Live has a reputation for delivering very senior board level audiences to attend a wide range of world class thought-leadership events across the globe for nearly 40 years.The FT Digital Health Summit Europe will be attended by:Life science companiesPharmaceutical and biotechnology companies Healthcare providers Multi-technology corporations Investment banks Medical device manufacturers Health insurers Health/big data companies Venture capitalists Health regulatory agencies Mobile app providers Mobile operators and service providers Technology consultancies Management consultancies Telemedicine companies Mobile technology manufacturers Digital health companies Data integrators/analytics/brokers Genomics/personalised medicine related companies Wireless-device manufacturers\n    \n        Gain access to senior decision makers across the full spectrum of the healthcare industryBrand alignment with the FT and its unrivalled credibilityDemonstrate thought leadership around the current critical issues affecting the healthcare sectorBenefit from sustained international visibility through our advertising and marketing campaigns\n    \n        Ticket Type                                                                                FeeStandard Summit Ticket£899 +VAT"
	}
];

const dataMapper = ({title, location, uri, imageSrc}) => ({
	location,
	imageSrc,
	body: title,
	url: uri
});

const renderApp = (data) => render((
   	<TeaserCollection 
   		heading={<TeaserHeading text="Financial Times Live Events" url="https://live.ft.com" />}
   	>
	   {stubData.map((data) => (
	   		<FTLiveItem 
	   			{...dataMapper(data)}
	   		/>
	   ))}
	</TeaserCollection>
), document.getElementById('hack-root'));


fetch(`https://local.ft.com:8080/getevent/${contentId}`).then((response) => response.json())
  .then(function(body) {
  	renderApp(body);
  })
  .catch(function(error) {
  	console.error('Hack call failed', error);
  	renderApp(stubData);
  });
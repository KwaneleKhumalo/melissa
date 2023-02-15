const cardContainer = document.querySelector('.suggested-listings');
const resultContainer = document.querySelector('.result-container');
const messageContainer = document.querySelector('.message');
let testLink = new URLSearchParams(window.location.search).get('page');
let paginationLink = document.getElementById('pagination-link');
let totalPages = document.querySelector('.total-pages');

import {montanaCity} from "./montana.js";

// TODO Loop through all the images instead
// TODO: About Page
// TODO: Finish Contact
// TODO: Resources Page
// TODO: Routes On Backend
// TODO: ENV Variables
// TODO: Loader






// Get all listings
const getListings = async () => 
{
    try 
    {  
        const url = `http://localhost:3000/listings`;
        let configData = config('get', url);
        const getData = await axios(configData);
        const data = await getData.data.value;

        let paginate = pagination(data, state.currentPage, state.limit)
        paginate.dataSet.map((listing) => 
        {
            let propertyDetails = {};
            
            if(listing.PropertyType === 'Commercial'|| listing.PropertyType === 'Commercial Lease'|| listing.PropertyType === 'Commercial Sale'|| listing.PropertyType ==='Land' || listing.PropertyType === 'Agriculture' || listing.PropertyType    === 'Quadruplex' || listing.PropertyType === 'Business Opportunity' || listing.PropertyType === 'Multi-Family')         
            {
                propertyDetails = 
                {
                    Bedrooms: `Bedrooms: 0`,
                    Bathrooms: `Bathrooms: 0`,
                    LotSize: `Lot Size: ${listing.LotSizeSquareFeet} SF`, 
                    ListingPrice: `List Price: $${listing.ListPrice.toLocaleString('ru-RU')}.00`,
                    ListingOffice: `Listing Office: ${listing.ListOfficeName}`,
                    PropertyType: `Type: ${listing.PropertyType}`
                }
       
            }

            else
            {
                propertyDetails = 
                {
                    Bedrooms: `Bedrooms: ${listing.BedroomsTotal}`,
                    Bathrooms: `Bathrooms: ${listing.BathroomsTotalInteger}`,
                    LotSize: `Lot Size: ${listing.LotSizeSquareFeet} SF`, 
                    ListingPrice: `List Price: $${listing.ListPrice.toLocaleString('ru-RU')}.00`,
                    ListingOffice: `Listing Office: ${listing.ListOfficeName}`,
                    PropertyType: `Type: ${listing.PropertyType}`
                }

            }

            //card
            const card = () => 
            {
                // preloader.style.display = 'none';

                // creates a card
                const card = document.createElement('div');
                card.className = 'card z-depth-3';
                cardContainer.appendChild(card);

                // Card Img
                const listingImage = document.createElement('img');
                listingImage.setAttribute('src', listing.Media[0].MediaURL);
                listingImage.className = 'card-img-top';

                const imgLabel = document.createElement('p'); 
                imgLabel.className = 'img-label';

                imgLabel.innerText = listing.ListOfficeName;
                card.appendChild(imgLabel);
                card.appendChild(listingImage);

                //Card Body
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                card.appendChild(cardBody);

                //card Title
                const cardTitle = document.createElement('h5');
                let address = `${listing.StreetName} ${listing.StreetNumber}`;

                if(listing.StreetName === null || listing.StreetName === 'None' || listing.StreetName === undefined)
                {
                      address = '---'  
                }
                
                    cardTitle.innerText = address;
                    cardTitle.className = 'card-title';
                    cardBody.append(cardTitle);

                //Card Text
                let textArray = [];
                textArray.push(propertyDetails.Bedrooms, propertyDetails.Bathrooms,propertyDetails.PropertyType, propertyDetails.LotSize);

                textArray.forEach((cardTextContent) =>
                {
                    let cardText = document.createElement('p');
                    cardText.className = 'card-text';
                
                    cardText.innerText = cardTextContent;
                    cardBody.append(cardText)
                })

                // Card Footer
                const cardFooter = document.createElement('div');
                cardFooter.className = 'card-footer';
            
                const cardFooterHeader = document.createElement('div');
                cardFooterHeader.className = 'card-footer-header';
            
                const cardFooterPrice = document.createElement('div');
                cardFooterPrice.innerText = propertyDetails.ListingPrice;
                cardFooterHeader.append(cardFooterPrice)

                const cardFooterBtn = document.createElement('a');
                cardFooterBtn.href = `property.html?id=${listing.ListingKey}`;
                cardFooterBtn.target = '_blank';

                cardFooterBtn.className = 'card-footer-btn btn waves-effect waves';
                cardFooterBtn.innerText = 'View More';

                cardFooter.append(cardFooterHeader);
                cardFooter.append(cardFooterBtn);
                cardBody.appendChild(cardFooter);

                // Card Hover Effect
                const cardHoverEffect = () => 
                {
                        card.addEventListener('mouseover', () => {
                            imgLabel.style.opacity = 1;
                        });
                    
                        card.addEventListener('mouseout', () => {
                            imgLabel.style.opacity = 0;
                        });
                }
                
            cardHoverEffect();
            }
           
            
            card();

        });
        
        paginationButtons(paginate.pages, cardContainer)
    } 
    
    catch (error)  
    {
        cardContainer.innerHTML = `<h1> ${error.message} <br> No Properties to display</h1> <br>`
        console.log(error);
    }
}

const searchListings = async () => {
    let cityQuery = document.querySelector('.search');
    document.querySelector('.search-feature').addEventListener('submit', async (e) => 
    {
        e.preventDefault();

        const searchUrl = `http://localhost:3000/search/${cityQuery.value}`;
        resultContainer.innerHTML = '';
        paginationLink.style.display = 'none';
        totalPages.style.display = 'none';

        // validation
        if(montanaCity.includes(cityQuery.value))
        {
            messageContainer.style.display = 'none'
            cardContainer.style.display = 'none';
            const query = await axios.get(searchUrl);
            const listingData = query.data;


            const dataOutput = () => 
                {
                    listingData.map((singleListing) => 
                    {

                        let propertyDetails = {};

                        if(singleListing.PropertyType === 'Commercial'|| singleListing.PropertyType ==='Land' || singleListing.PropertyType ==='Agriculture' ||singleListing.PropertyType==='Quadruplex' || singleListing.PropertyType === 'Multi-Family' || singleListing.PropertyType === 'Commercial Sale' || singleListing.PropertyType === 'Commercial Lease')
                        {
                            propertyDetails = 
                            {
                                Bedrooms: `Bedrooms: 0`,
                                Bathrooms: `Bathrooms: 0`,
                                LotSize: `Lot Size: ${singleListing.LotSizeSquareFeet} SF`, 
                                ListingPrice: `List Price: $${singleListing.ListPrice.toLocaleString('ru-RU')}.00`,
                                ListingOffice: `Listing Office: ${singleListing.ListOfficeName}`,
                                PropertyType: `Type: ${singleListing.PropertyType}`
                            }
                        } 
                    
                        else
                        {
                            propertyDetails = 
                            {
                                Bedrooms: `Bedrooms: ${singleListing.BedroomsTotal}`,
                                Bathrooms: `Bathrooms: ${singleListing.BathroomsFull}`,
                                LotSize: `Lot Size: ${singleListing.LotSizeSquareFeet} SF`, 
                                ListingPrice: `List Price: $${singleListing.ListPrice.   toLocaleString('ru-Ru')}.00`,
                                ListingOffice: `Listing Office: ${singleListing.ListOfficeName}`,
                                PropertyType: `Type: ${singleListing.PropertyType}` 
                            }
                        }
                    
                        // creates a card
                        const card = document.createElement('div');
                        card.className = 'card z-depth-3';
                        resultContainer.appendChild(card);
                        // For images
                        const cardImg = singleListing.Media[0].MediaURL;
                        const listingImage = document.createElement('img');
                        listingImage.className = 'card-img-top';
                        listingImage.src = cardImg;
                        const imgLabel = document.createElement('p');
                        imgLabel.className = 'img-label';
                        imgLabel.innerText = propertyDetails.ListingOffice;

                        card.appendChild(imgLabel);
                        card.appendChild(listingImage);


                        // creates a card-body
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';
                        card.appendChild(cardBody);

                        // Card Title
                        const unparsedAddress = `${singleListing.UnparsedAddress} 
                        `;
                        const cardTitle = document.createElement('h5');
                        cardTitle.innerText = unparsedAddress
                        cardTitle.className = 'card-title';
                        cardBody.append(cardTitle);


                        // Card Text
                        let textArray = [];
                        textArray.push(propertyDetails.Bedrooms, propertyDetails.   Bathrooms,propertyDetails.PropertyType, propertyDetails.    LotSize);
                        textArray.map((cardTextContent) => 
                        {
                            let cardText = document.createElement('p');
                            cardText.className = 'card-text';
                        
                            cardText.innerText = cardTextContent;
                            cardBody.append(cardText)
                        });
                    
                    
                        // Card Footer
                        const cardFooter = document.createElement('div');
                        cardFooter.className = 'card-footer';
                    
                        const cardFooterHeader = document.createElement('div');
                        cardFooterHeader.className = 'card-footer-header';
                    
                        const cardFooterPrice = document.createElement('div');
                        cardFooterPrice.innerText = propertyDetails.ListingPrice;
                        cardFooterHeader.append(cardFooterPrice)
                    
                    
                        const cardFooterBtn = document.createElement('a');
                        cardFooterBtn.href = `property.html?id=${singleListing.ListingKey}`;
                        cardFooterBtn.target = '_blank';


                        cardFooterBtn.className = 'card-footer-btn btn waves-effect     waves';
                        cardFooterBtn.innerText = 'View More'
                        cardFooter.append(cardFooterHeader);
                        cardFooter.append(cardFooterBtn);
                    
                        cardBody.appendChild(cardFooter);

                        const cardHoverEffect = () => {
                            card.addEventListener('mouseover', () => {
                                imgLabel.style.opacity = 1;
                            });
                        
                            card.addEventListener('mouseout', () => {
                                imgLabel.style.opacity = 0;
                            });
                        }
                    
                        cardHoverEffect();
                    
                    });

            }

            cityQuery.value = '';    
            dataOutput()
        
        }
         else
        {
            let message = document.querySelector('.message-text');
            message.textContent = 'Please enter a valid Montana city or town';
            let messageSpan = document.querySelector('.message-span');
            messageSpan.textContent = '(i.e Hamilton)';
            messageContainer.appendChild(message);
            messageContainer.appendChild(messageSpan);
        
            return false;
        }

    });
}

let state = {
    'currentPage': 1,
    'limit': 16,
    'window': 5
}


const config = (method, url) =>
{
    let config = 
    {
        method: method,
        url: url
    }

    return config
}

const pagination = (dataSet, page, limit) => 
{
    let startIndex = (page - 1) * limit
    let endIndex = startIndex + limit

    let trimmedData = dataSet.slice(startIndex, endIndex)

    let totalNumOfPages = Math.ceil(dataSet.length/limit)
    totalPages.textContent = `${page} of ${totalNumOfPages} Pages`

    return {
        'dataSet': trimmedData,
        'pages': totalNumOfPages
    }
}

const paginationButtons = (pages, container) => {
    paginationLink.innerHTML = ''

    let maxLeft = (state.currentPage - Math.floor(state.window/2))
    let maxRight = (state.currentPage + Math.floor(state.window/2))

    if(maxLeft < 1)
    {
        maxLeft = 1
        maxRight = state.window
    } 
    else if(maxRight > pages)
    {
        maxLeft = pages - (state.window - 1)
        maxRight = pages;

        if(maxLeft < 1)
        {
            maxLeft = 1
        }
    }

    

    for(let i = maxLeft; i <= maxRight; i++)
    {
        let pagesBtn = document.createElement("button");
        pagesBtn.className = 'page btn btn-sm btn-info';
        pagesBtn.innerText = i;
        pagesBtn.value = i;

        paginationLink.appendChild(pagesBtn)
    }

     
    if (state.page != 1) {
        paginationLink.innerHTML = `<button value=${1} class="page-icons page btn btn-sm btn-info">&#171;</button>` + paginationLink.innerHTML
    }
    if (state.page != pages) 
    {
        paginationLink.innerHTML += `<button value=${pages} class="page-icons page btn btn-sm btn-info">&#187;</button>`
    }


    $('.page').on('click', function() {
        $(container).empty()
        state.currentPage = Number($(this).val())
        container.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
        
        getListings()
    })

}


const loaded = () => {
    if(contentLoaded === true)
    {
        loader.style.display = 'block';
    }
    
    if(contentLoaded === false)
    {
        loader.style.display = 'none';
    }
}



config();
searchListings();
getListings();

// IDX information is provided exclusively for personal, non-commercial use, and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Information is deemed reliable but not guaranteed. The listing broker’s offer of compensation is made only to participants of the MLS where the listing is filed.
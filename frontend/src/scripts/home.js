

const featuredProperties = async () => {
    const endpointUrl = 'http://localhost:3000/melissalistings';
    try 
    {
        const listings = await axios.get(endpointUrl);
        const listingsData = listings.data.value;

        const cardContainer = document.querySelector('.card-container')
    
        listingsData.map((data) => {

        // This is for spitting out card body in a strong element. 
        let cardBodyData;
        if(data.PropertyType === 'Land')
        {
            cardBodyData = 
            {
                bedrooms: `Bedrooms: 0`,
                Bathrooms: `Bathrooms: ${data.BathroomsTotalInteger}`,
                PropertyType: `Property Type: ${data.PropertyType}`, 
                ListingPrice: `List Price: $${data.ListPrice.toLocaleString('ru-RU')}.00`,
                ListingAgent: `Listing Agent: ${data.ListAgentFirstName} ${data.ListAgentLastName}`
            }
        }
        else 
        {
            cardBodyData = 
            {
                bedrooms: `Bedrooms: ${data.BedroomsTotal}`,
                Bathrooms: `Bathrooms: ${data.BathroomsTotalInteger}`,
                PropertyType: `Property Type: ${data.PropertyType}`, 
                ListingPrice: `List Price: $${data.ListPrice.toLocaleString("ru-RU")}.00`,
                ListingAgent: `Listing Agent: ${data.ListAgentFirstName} ${data.ListAgentLastName}`
            }
        }
       

    // Function to output all of listings data. 
    const outputData = () => 
    {
            let propertyInfo;
            propertyInfo = [];

            propertyInfo.push(cardBodyData.bedrooms, cardBodyData.Bathrooms, cardBodyData.PropertyType, cardBodyData.ListingPrice,cardBodyData.ListingAgent);


            const listingPhoto = data.Media;

            const cardTitleText = document.createElement('h5');
            cardTitleText.innerText = `${data.StreetNumber} ${data.StreetName} ${data.StreetSuffix}, ${data.City}`;

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-header';
        
            cardTitle.append(cardTitleText);

            const card = document.createElement('div');
            card.className = 'card';

            const cardImg = document.createElement('img');
            cardImg.className = 'card-img'
            cardImg.src = listingPhoto[0].MediaURL;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            

            const cardBtn = document.createElement('a');
            cardBtn.className = 'btn listing-btn waves waves-effect-light'
            cardBtn.href = `property.html?id=${data.ListingKey}`;
            cardBtn.target = '_blank';

       
            cardBtn.innerText = 'View'

            const cardFooter = document.createElement('div');
            cardFooter.className = 'card-footer';
            cardFooter.append(cardBtn);
            
            card.appendChild(cardTitle);
            card.appendChild(cardImg);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            cardContainer.appendChild(card);


            propertyInfo.forEach((cardBodyInfo => 
            {

                let strong = document.createElement('strong');
                strong.append(cardBodyInfo);
                cardBody.append(strong);
            }));
        }
 
        outputData();
        
    });    
    } 
    catch (error) 
    {
        const errorMessage = document.querySelector('.featured-header');
        errorMessage.textContent = 'Something went wrong. Unable to load properties.'
    }
}

featuredProperties();

var instance = M.Carousel.init({
    fullWidth: true
  });
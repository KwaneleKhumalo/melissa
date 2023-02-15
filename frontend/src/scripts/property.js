let propertyId = new URLSearchParams(window.location.search).get('id');

const getProperty = async () => {
    const url = `http://localhost:3000/listing/${propertyId}`
    try 
    {
        const property = await axios.get(url);
        const data = property.data;

        const photos = data.Media;

        const headerSlide = () => 
        {
            for(let i = 0; i < photos.length; i++)
            {
                

                if(photos[i].MediaCategory === 'Photo')
                {
                    const headerSlide = document.querySelector('.header-slide');
                
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-item');
                    const slideImg = document.createElement('img');
                    slideImg.className = 'd-block w-100';
                    slideImg.src = photos[i].MediaURL;
                    const activeImg = document.querySelector('.active-img');
                    activeImg.src = photos[i].MediaURL;
                    slide.append(slideImg);
                    headerSlide.appendChild(slide);
                }
            }
        }

        const propertyDetails = () => 
        {
                const propertyStatus = document.querySelector('.property-status');
                propertyStatus.textContent = `${data.MlsStatus}`;

    
                if(data.MlsStatus === 'Active'){
                    propertyStatus.classList.add('text-success')
                } else
                {
                    propertyStatus.classList.add('text-warning')
                }
    
                const propertyAddress = document.querySelector('.property-address');
    
                if(data.UnparsedAddress === '********')
                {
                    propertyAddress.textContent = '';
                } else
                {
                    propertyAddress.textContent = `${data.UnparsedAddress}`;
                }
    
                const beds = document.querySelector('.beds');
                const baths = document.querySelector('.baths');

                if(data.PropertyType === 'Land' || data.PropertyType === 'Agriculture' || data.PropertyType === 'Commercial'|| data.PropertyType === 'Multi-Family' || data.PropertyType === 'Commercial Sale' || data.PropertyType === 'Commercial Lease')
                {
                    beds.textContent = `0`
                    baths.textContent = `0`

                } else
                {
                    beds.textContent = `${data.BedroomsTotal}`;
                    baths.textContent = `${data.BathroomsFull}`;

                }
    
                const type = document.querySelector('.type');
                type.textContent = `Property Type: ${data.PropertyType}`;
    
                const size = document.querySelector('.size');
                size.textContent = `ACRES: ${data.LotSizeAcres} `;
    
                const price = document.querySelector('.price');
                price.textContent = `$${data.ListPrice.toLocaleString('ru-RU')}.00`;
    
                const directions = document.querySelector('.directions');
                let dataDirections = data.Directions;

                if(dataDirections === null)
                {
                    directions.innerText = 'No directions provided'
                }
                else
                {
                    directions.innerText = `${dataDirections}`;
                }
                
    
                const location = document.querySelector('.location');
                location.textContent = `${data.City}, ${data.StateOrProvince}`;



                let remarks = data.PublicRemarks;
        
                if(remarks === null)
                {
                    remarks = `${data.Directions}`
                }
                const description = document.querySelector('.description');
                description.textContent = remarks;


        }

        const propertySlide = () => 
        {
                const activeDiv = document.querySelector('.body-active');
                const activeSlide = document.createElement('img');
                activeSlide.classList.add('.active-slide','d-block', 'w-100');
                activeSlide.src = photos[0].MediaURL;
                activeDiv.appendChild(activeSlide);


                const activeImg = document.querySelector('.body-carousel-inner');
                activeImg.src = photos[0].MediaURL;

                photos.map((img)=> 
                {
                    const bodySlide = document.querySelector('.body-carousel-inner');
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-item');
                    const slideImg = document.createElement('img');
                    slideImg.className = 'd-block w-100';


                    slideImg.src = img.MediaURL;
                    slide.append(slideImg);
                    bodySlide.appendChild(slide);
                    if(img.MediaCategory === 'Document'|| img.MediaCategory === 'Unbranded Virtual Tour' || img.MediaCategory === 'Video')
                    {
                        slide.remove()
                    }
                })


                // for(let i = 0; i < photos.length; i++)
                // {
                //     const bodySlide = document.querySelector('.body-carousel-inner');
                //     const slide = document.createElement('div');
                //     slide.classList.add('carousel-item');
                //     const slideImg = document.createElement('img');
                //     slideImg.className = 'd-block w-100';

                //     if(slideImg.getAttribute('src') === 'on.pdf')
                //     {
                //         console.log(slideImg);
                //     }

                //     slideImg.src = photos[i].MediaURL;
                //     slide.append(slideImg);
                //     bodySlide.appendChild(slide);
                    
                // }
            
        }
        
        headerSlide();
        propertyDetails();
        propertySlide();
    } 
    catch (error) 
    {
        
        document.querySelector('.carousel-inner').style.display = 'none';
        document.querySelector('header').classList.add('default-header');
        document.querySelector('.property-wrap').style.display = 'none';
        document.querySelector('.wrap').style.display = 'none';
        document.querySelector('.location').textContent = 'No Property to Display';
        document.querySelector('.body-slide').style.display = 'none';
    }

};

getProperty();


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './CarouselComponent.css';
import firstSlideImage from '../assets/images/first-slide.jpg'
import secondSlideImage from '../assets/images/second-slide.jpg'
import thirdSlideImage from '../assets/images/third-slide.jpg'

// first sldie Leonardo Thomas from Pixabay https://pixabay.com/photos/abu-dhabi-grand-mosque-342670/
// second slide Mohamed Hussein from Pixabay https://pixabay.com/photos/mosque-russia-travel-sky-building-6808592/
// Third slide Photo by Meruyert Gonullu: https://www.pexels.com/photo/muslim-symbol-of-moon-and-star-on-street-6243769/


function CarouselComponent() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={firstSlideImage}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <div>
                        <h3>What is Zakat?</h3>
                        <p>Zakat is an obligatory Islamic almsgiving for eligible Muslims</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={secondSlideImage}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <div>
                        <h3>The Purpose of Zakat</h3>
                        <p>In Islam, Zakat aims to redistribute wealth in the community</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
                <img 
                className='d-block w-100'
                src={thirdSlideImage}
                alt="Third slide"
                />
                <Carousel.Caption>
                    <div>
                        <h3>Who pays the Zakat?</h3>
                        <p>Muslims who have wealth above a certain threshold, known as Nisab</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
}

export default CarouselComponent;

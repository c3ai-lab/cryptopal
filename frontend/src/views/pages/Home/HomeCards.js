// ================================================================================================
// 	File Name: HomeCards.js
// 	Description:
//  This component renders cards for the sections on the landing page. By passing in an array of
//  data, this component renders a styled card for each element of the array displaying an image,
//  a heading and a short description text. It renders the cards conditionally for argument and
//  technologies section in a different direction (vertically and horizontally ordered).
// ================================================================================================
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

class HomeCards extends React.Component {
  renderCards = () => {
    const data = this.props.data;
    const rows = this.props.rows;
    const ElementType = rows ? Row : Col;
    let result = data.map((item) => {
      return (
        <ElementType key={item.id}>
          <Card className={rows ? 'tech-section' : ''}>
            <CardBody
              className={
                'text-center home-card ' +
                (rows ? 'home-rows-card ' : '') +
                (item.id % 2 ? 'float-right' : '')
              }>
              <img
                src={item.img}
                alt={item.title}
                className="mx-auto mb-2 home-img "
                width="180"
              />
              <div>
                <h4>{item.title.toUpperCase()}</h4>
                <p className="text-dark">{item.text}</p>
                {rows ? (
                  <a
                    className="link-more"
                    target="_blank"
                    href={item.link}
                    rel="noopener noreferrer">
                    Read more
                  </a>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </ElementType>
      );
    });
    return result;
  };
  render() {
    return <Row>{this.renderCards()}</Row>;
  }
}
export default HomeCards;

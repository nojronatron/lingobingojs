import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DauberLayer from './DauberLayer';
import PartyFavor from './funcLib/PartyFavor';
import glitterData from './glitter-types.json';
import BingoAnnouncer from './BingoAnnouncer';
import './tempstyle.css';
import './screenpartystyle.css';
export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
  }

  rowBuilder(randWords) {
    let result = [];
    for (let row = 0; row < 5; row++) {
      result.push(
        <Row
          key={row}
          className='mx-0'
        >{this.tileBuilder(row, randWords)}</Row>
      );
    }
    return result;
  }

  tileBuilder(row, randWords) {
    let result = [];
    const incrementor = row * 5;
    for (let col = 0; col < 5; col++) {
      const idx = col + incrementor;
      const currentWord = randWords[idx];
      result.push(
        <Col key={idx}
          className='word-col'
          // inline style is neccessary here to override the defualt style for 'Col'
          style={{ padding: 0 }}
        >
          <DauberLayer
            id={idx}
            styleClass={this.props.dauberedTiles[idx] ?
              'daubered' :
              'plain'}
            word={currentWord}
            handleTileClick={e => this.props.handleTileClick(e)}
          />
        </Col>);
    }
    return result;
  }

  renderGameboard(rows) {
    return (
      <Container fluid className='px-0' >
        <Row className='mx-0'>
          <Col></Col>
          <Col xs={'auto'}>Lets Play Bingo!</Col>
          <Col></Col>
        </Row>
        {rows}
      </Container>
    );
  }

  getBingoAnnouncement(text) {
    return (
      <BingoAnnouncer
        classname={'bingo'}
        text={text}
      />
    );
  }

  getPartyFavors() {
    return (
      <Container fluid className='px-0'>
        {glitterData.map((item) => {
          return (
            <PartyFavor
              key={item.id}
              classname={item.styleclass}
              src={item.url}
              alt={item.alt}
            />
          );
        })}
      </Container>
    );
  }

  render() {
    const rows = this.rowBuilder(this.props.randwords);
    const gameBoard = this.renderGameboard(rows);
    // const currentMove = this.props.moves;
    // const bingoAnnouncement = this.getBingoAnnouncement('B I N G O !');
    // const additionalInfo = 'Completed in ' + currentMove + ' words!';
    const partyfavors = this.getPartyFavors();

    return (
      <>
        {
          this.props.isBingoed ?
            partyfavors :
            gameBoard
        }
      </>
    );
  }
}

Gameboard.propTypes = {
  randwords: PropTypes.array,
  moves: PropTypes.number,
  dauberedTiles: PropTypes.array,
  handleTileClick: PropTypes.func,
  isBingoed: PropTypes.bool
};

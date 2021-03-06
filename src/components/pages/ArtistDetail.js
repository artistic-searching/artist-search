import React, { PureComponent } from 'react';
import { getArtistDetail } from '../services/artistApi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ArtistDetail extends PureComponent {
  state = {
    works: []
  }
  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    getArtistDetail(this.props.match.params.id)
      .then(res => {
        this.setState({ works: res.results });
      });
  }


  render() {
    const { name } = this.props.match.params;
    const works = this.state.works.map(work => {
      return (
        <Link key={work.id} to={`/works/${name}/${work.title}`}><li>{work.title}</li></Link>
      );
    });
    return (
      <ul>
        { works }
      </ul>
    );
  }
}

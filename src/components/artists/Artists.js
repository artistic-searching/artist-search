import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Artist from './Artist';
import { withPaging } from '../paging/Paging';
import { getArtists } from '../services/artistApi';
import { Link } from 'react-router-dom';

export default class Artists extends PureComponent {
  state = {
    artists: []
  }

  static propTypes = {
    artistText: PropTypes.string,
    updateTotalPages: PropTypes.func,
    page: PropTypes.number
  }

  static defaultProps = {
    page: 1
  }

  componentDidUpdate(prevProps) {
    if(prevProps.artistText !== this.props.artistText || prevProps.page !== this.props.page) {
      getArtists({ search: this.props.artistText, page: this.props.page - 1 })
        .then(res => {
          this.setState({ artists: res.results });
          this.props.updateTotalPages(res.totalPages);
        });
    }
  }

  render() {
    const artists = this.state.artists.map(artist => {
      return (
        <Link key={artist.id} to={`/artistDetail/${artist.name}/${artist.id}`}> <Artist artist={artist} /></Link>
      );
    });
    return (
      <ul>
        {artists}
      </ul>
    );
  }
}
export const ArtistsWithPaging = withPaging(Artists);

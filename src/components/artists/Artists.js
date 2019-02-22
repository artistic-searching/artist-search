import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Artist from './Artist';
import { withPaging } from '../paging/Paging';

export default class Artists extends PureComponent {
  static propTypes = {
    artists: PropTypes.array.isRequired
  }
  render() {
    const artists = this.props.artists.map(artist => {
      return (
        <Artist key={artist.id} artist={artist} />
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

import React from 'react';

class DisplayListing extends React.Component {

  render() {
    const {listing} = this.props
    return(
      <div className="col">
        <div className="row"><h3>Guild: {listing.guildname}</h3></div>
        <div className="row">Server: {listing.region} - {listing.server}</div>
        <div className="row">Faction: {listing.faction}</div>
        <div className="row">Language: {listing.language}</div>
        <div className="row">Raid Type: {listing.raidtype}</div>
        <div className="row">Raid Times: </div>
        <div className="row">Progress: </div>
        <div className="row"><h3>Classes: </h3></div>
        <div className="row"> </div>
        <div className="row"><h3>Contact Details:</h3></div>
        <div className="row">Battle.net Contacts: {listing.contactbnet}</div>
        <div className="row">Discord Contacts: {listing.contactdiscord}</div>
        <div className="row">Discord Link: {listing.discordlink}</div>
        <div className="row">Website: {listing.website}</div>
        <div className="row"><h3>Description:</h3></div>
        <div className="row">{listing.description}</div>
        <div className="row">Last Updated: {listing.lastupdated}</div>
      </div>
    )
  }
}
export default DisplayListing;

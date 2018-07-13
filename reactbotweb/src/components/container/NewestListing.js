import React, { Component } from 'react'
import { connect } from 'react-redux'
import DisplayListing from '../presentational/DisplayListing'
import { fetchListing } from '../../actions'

class NewestListing extends Component {
  componentDidMount() {
    this.props.dispatch(fetchListing('newest'))
  }

  render () {
    const { newestListing } = this.props

    if (newestListing) {
      return (
        <div>
          <DisplayListing listing={newestListing} />
        </div>
      )
    }
    return(
      <div>Pooping...</div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      newestListing: state.newestListing.listing
    }
}
export default connect(mapStateToProps)(NewestListing)

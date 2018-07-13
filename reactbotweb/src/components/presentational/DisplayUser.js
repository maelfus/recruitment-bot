import React from 'react'
import { NavLink } from 'reactstrap'

export default class DisplayUser extends React.Component {
  render() {
    const user = this.props.user
    const avatar = `http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`
    return (
      <NavLink href="#"><img className="img-rounded" src={avatar} alt="" /><span className="text-white"> {user.username}#{user.discriminator}</span></NavLink>
    )
  }
}

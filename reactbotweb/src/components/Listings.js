import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUserListing } from '../actions'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap'

class Listings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listing: {
        guildName: '',
        user: '',
        deathKnight: {},
        demonHunter: {},
        druid: {},
        hunter: {},
        mage: {},
        monk: {},
        paladin: {},
        priest: {},
        rogue: {},
        shaman: {},
        warlock: {},
        warrior: {}
      }
    }
    // Set default state for the form here
    // Once the user has an existing listing, use user data pulled from mongo (TBI)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    let { listing } = this.state
/*
    if (userListing && userListing.hasOwnProperty('guildName')) {
      this.setState({
        listing: userListing
      })
    } else {
      this.setState({
        listing: {
          ...listing,
          user: this.props.userApp
        }
      })
    }*/
  }

  handleInputChange(event) {
    let {listing} = this.state
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    listing[name] = value

    this.setState({
      listing
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.listing)
    let data = this.state.listing
    data.user = this.props.userId
    await this.props.dispatch(postUserListing(data))
  }

  render() {

    return (
      <div className="container-fluid text-light">
          <Form onSubmit={this.handleSubmit}>
            <h3>Guild Details</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Guild Name:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="guildName" value={this.state.listing.guildName} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Region:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="region" value={this.state.listing.region}>
                <option value="NA">NA</option>
                <option value="EU">EU</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Server:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="server" value={this.state.listing.server}>
                <option value="Doomhammer">Doomhammer</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Faction:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="faction" value={this.state.listing.faction}>
                <option value="Horde">Horde</option>
                <option value="Alliance">Alliance</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Language:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="language" value={this.state.listing.language} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Raid Type:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="raidType" value={this.state.listing.raidType} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Raid Times:</Label>

            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Progress:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="progress" value={this.state.listing.progress} onChange={this.handleInputChange} />
            </FormGroup>
            <br /><br />
            <h3>Recruiting Classes</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Death Knight:</Label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Blood</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight" id="blood" value={this.state.listing.deathKnight.blood} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Unholy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight" value={this.state.listing.deathKnight.unholy} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Frost</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight" value={this.state.listing.deathKnight.frost} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Demon Hunter:</Label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Havoc</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="demonhunter" value={this.state.listing.demonHunter.havoc} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Vengeance</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="demonhunter" value={this.state.listing.demonHunter.vengeance} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Druid:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Balance</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.listing.druid.balance} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Feral</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.listing.druid.feral} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Guardian</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.listing.druid.guardian} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Restoration</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.listing.druid.restoration} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline className="row">
              <label className="col flex-nowrap" style={{width: "150px"}}>Hunter:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Beast Mastery</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter" value={this.state.listing.hunter.beastMastery} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Marksmanship</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter" value={this.state.listing.hunter.marksmanship} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Survival</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter" value={this.state.listing.hunter.survival} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Mage:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Arcane</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage" value={this.state.listing.mage.arcane} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Fire</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage" value={this.state.listing.mage.fire} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Frost</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage" value={this.state.listing.mage.frost} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Monk:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Brewmaster</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk" value={this.state.listing.monk.brewmaster} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Mistweaver</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk" value={this.state.listing.monk.mistweaver} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Windwalker</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk" value={this.state.listing.monk.windwalker} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Paladin:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Holy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin" value={this.state.listing.paladin.holy} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Protection</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin" value={this.state.listing.paladin.protection} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Retribution</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin" value={this.state.listing.paladin.retribution} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Priest:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Discipline</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest" value={this.state.listing.priest.discipline} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Holy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest" value={this.state.listing.priest.holy} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Shadow</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest" value={this.state.listing.priest.shadow} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Rogue:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Assassination</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue" value={this.state.listing.rogue.assassination} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Outlaw</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue" value={this.state.listing.rogue.outlaw} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Subtlety</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue" value={this.state.listing.rogue.subtlety} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Shaman:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Elemental</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman" value={this.state.listing.shaman.elemental} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Enhancement</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman" value={this.state.listing.shaman.enhancement} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Restoration</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman" value={this.state.listing.shaman.restoration} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Warlock:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Affliction</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock" value={this.state.listing.warlock.affliction} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Demonology</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock" value={this.state.listing.warlock.demonology} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Destruction</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock" value={this.state.listing.warlock.destruction} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <label className="col flex-nowrap" style={{width: "150px"}}>Warrior:</label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Arms</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior" value={this.state.listing.warrior.arms} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Fury</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior" value={this.state.listing.warrior.fury} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Protection</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior" value={this.state.listing.warrior.protection} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br /><br />
            <h3>Contact Details</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "175px", display: "inline-block"}}>Battle.net Contacts:
              (comma separated)</Label>
              <Input className="col flex-nowrap" name="bnetContacts" type="text" value={this.state.listing.bnetContacts} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "175px", display: "inline-block"}}>Discord Contacts:
              (comma separated)</Label>
              <Input className="col flex-nowrap" name="discordContacts" type="text" value={this.state.listing.discordContacts} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline className="row">
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Discord Link:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="discordLink" value={this.state.listing.discordLink} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline className="row">
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Website:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="website" value={this.state.listing.website} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check>
              <Label className="row flex-nowrap" style={{width: "150px", display: "inline-block"}}>Description:</Label>
              <Input className="row flex-nowrap" style={{width: "500px"}} type="textarea" name="description" value={this.state.listing.description} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <input type="submit" value="Submit" />
          </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {userListing, userApp} = state
  return (
    userListing: userListing.listing,
    userApp: userApp.user
  )
}

export default connect(mapStateToProps)(Listings)

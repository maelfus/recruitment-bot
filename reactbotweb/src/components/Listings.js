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

class classesObj {
  constructor() {
    this.deathknight_Blood = false
    this.deathknight_Frost = false
    this.deathknight_Unholy = false
    this.demonhunter_Havoc = false
    this.demonhunter_Vengeance = false
    this.druid_Balance = false
    this.druid_Feral = false
    this.druid_Guardian = false
    this.druid_Restoration = false
    this.hunter_BeastMastery = false
    this.hunter_Marksmanship = false
    this.hunter_Survival = false
    this.mage_Arcane = false
    this.mage_Fire = false
    this.mage_Frost = false
    this.monk_Brewmaster = false
    this.monk_Mistweaver = false
    this.monk_Windwalker = false
    this.paladin_Holy = false
    this.paladin_Protection = false
    this.paladin_Retribution = false
    this.priest_Discipline = false
    this.priest_Holy = false
    this.priest_Shadow = false
    this.rogue_Assassination = false
    this.rogue_Outlaw = false
    this.rogue_Subtlety = false
    this.shaman_Elemental = false
    this.shaman_Enhancement = false
    this.shaman_Restoration = false
    this.warlock_Affliction = false
    this.warlock_Demonology = false
    this.warlock_Destruction = false
    this.warrior_Arms = false
    this.warrior_Fury = false
    this.warrior_Protection = false
  }
}

class Listings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listing: {
        guildname: '',
        language: '',
        region: "NA",
        server: "Doomhammer",
        faction: "Horde",
        raidtype: "",
        raidtimes: [],
        progress: [],
        classes: new classesObj(),
        contactbnet: "",
        contactdiscord: "",
        discordlink: "",
        website: "",
        description: "",
        user: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClassChange = this.handleClassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    const { userListing, userApp } = this.props
    let { listing } = this.state
    if (userListing) {
      let classes = new classesObj()
      for(var key in userListing.classes) {
        if (userListing.classes.hasOwnProperty(key)) {
          userListing.classes[key].map((element) => {
            let param = `${key}_${element}`
            classes[param] = true
          })
        }
      }
      
      this.setState({
        listing: {
          guildname: userListing.guildname,
          language: userListing.language,
          region: userListing.region,
          server: userListing.server,
          faction: userListing.faction,
          raidtype: userListing.raidtype,
          raidtimes: userListing.raidtimes,
          progress: userListing.progress,
          classes: classes,
          contactbnet: userListing.contactbnet,
          contactdiscord: userListing.contactdiscord,
          discordlink: userListing.discordlink,
          website: userListing.website,
          description: userListing.description,
          user: userListing.user
        }
      })
    } else {
      this.setState({
        listing: {
          ...listing,
          user: userApp.user ? userApp.user.id : ''
        }
      })
    }
  }

  handleClassChange(event) {
    let {listing} = this.state
    const target = event.target
    const value = target.checked
    const name = target.name
    listing.classes[name] = value

    this.setState({
      listing
    })
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
    let data = Object.assign({}, this.state.listing)
    if (data.user === '' ) {
      alert('Please log in before submitting a new listing.')
    } else {
      let classes = {}
      for (var key in data.classes) {
        if (data.classes.hasOwnProperty(key) && data.classes[key] === true) {
          let str = key.split("_")
          classes.hasOwnProperty(str[0]) ? classes[str[0]].push(str[1]) : classes[str[0]] = [str[1]]
        }
      }
      data.classes = Object.assign({}, classes)
      await this.props.dispatch(postUserListing(data))
      alert('Your listing has been submitted. \n(There currently isn\'t any error checking)')
    }
  }

  render() {
    return (
      <div className="container-fluid text-light">
          <Form onSubmit={this.handleSubmit}>
            <h3>Guild Details</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Guild Name:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="guildname" value={this.state.listing.guildname} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Region:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="region" value={this.state.listing.region} onChange={this.handleInputChange}>
                <option value="NA">NA</option>
                <option value="EU">EU</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Server:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="server" value={this.state.listing.server} onChange={this.handleInputChange}>
                <option value="Doomhammer">Doomhammer</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Faction:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="faction" value={this.state.listing.faction} onChange={this.handleInputChange}>
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
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="raidtype" value={this.state.listing.raidtype} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="deathknight_Blood" id="deathknight_Blood" checked={this.state.listing.classes.deathknight_Blood} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Unholy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight_Unholy" id="deathknight_Unholy" checked={this.state.listing.classes.deathknight_Unholy} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Frost</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight_Frost" id="deathknight_Frost" checked={this.state.listing.classes.deathknight_Frost} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="demonhunter_Havoc" id="demonhunter_Havoc" checked={this.state.listing.classes.demonhunter_Havoc} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Vengeance</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="demonhunter_Vengeance" id="demonhunter_Vengeance" checked={this.state.listing.classes.demonhunter_Vengeance} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="druid_Balance" id="druid_Balance" checked={this.state.listing.classes.druid_Balance} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Feral</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid_Feral" id="druid_Feral" checked={this.state.listing.classes.druid_Feral} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Guardian</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid_Guardian" id="druid_Guardian" checked={this.state.listing.classes.druid_Guardian} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Restoration</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid_Restoration" id="druid_Restoration" checked={this.state.listing.classes.druid_Restoration} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="hunter_BeastMastery" id="hunter_BeastMastery" checked={this.state.listing.classes.hunter_BeastMastery} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Marksmanship</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter_Marksmanship" id="hunter_Marksmanship" checked={this.state.listing.classes.hunter_Marksmanship} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Survival</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter_Survival" id="hunter_Survival" checked={this.state.listing.classes.hunter_Survival} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="mage_Arcane" id="mage_Arcane" checked={this.state.listing.classes.mage_Arcane} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Fire</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage_Fire" id="mage_Fire" checked={this.state.listing.classes.mage_Fire} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Frost</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage_Frost" id="mage_Frost" checked={this.state.listing.classes.mage_Frost} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="monk_Brewmaster" id="monk_Brewmaster" checked={this.state.listing.classes.monk_Brewmaster} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Mistweaver</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk_Mistweaver" id="monk_Mistweaver" checked={this.state.listing.classes.monk_Mistweaver} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Windwalker</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk_Windwalker" id="monk_Windwalker" checked={this.state.listing.classes.monk_Windwalker} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="paladin_Holy" id="paladin_Holy" checked={this.state.listing.classes.paladin_Holy} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Protection</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin_Protection" id="paladin_Protection" checked={this.state.listing.classes.paladin_Protection} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Retribution</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin_Retribution" id="paladin_Retribution" checked={this.state.listing.classes.paladin_Retribution} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="priest_Discipline" id="priest_Discipline" checked={this.state.listing.classes.priest_Discipline} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Holy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest_Holy" id="priest_Holy" checked={this.state.listing.classes.priest_Holy} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Shadow</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest_Shadow" id="priest_Shadow" checked={this.state.listing.classes.priest_Shadow} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="rogue_Assassination" id="rogue_Assassination" checked={this.state.listing.classes.rogue_Assassination} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Outlaw</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue_Outlaw" id="rogue_Outlaw" checked={this.state.listing.classes.rogue_Outlaw} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Subtlety</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue_Subtlety" id="rogue_Subtlety" checked={this.state.listing.classes.rogue_Subtlety} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="shaman_Elemental" id="shaman_Elemental" checked={this.state.listing.classes.shaman_Elemental} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Enhancement</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman_Enhancement" id="shaman_Enhancement" checked={this.state.listing.classes.shaman_Enhancement} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Restoration</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman_Restoration" id="shaman_Restoration" checked={this.state.listing.classes.shaman_Restoration} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="warlock_Affliction" id="warlock_Affliction" checked={this.state.listing.classes.warlock_Affliction} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Demonology</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock_Demonology" id="warlock_Demonology" checked={this.state.listing.classes.warlock_Demonology} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Destruction</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock_Destruction" id="warlock_Destruction" checked={this.state.listing.classes.warlock_Destruction} onChange={this.handleClassChange} />
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
                    <Input addon type="checkbox" name="warrior_Arms" id="warrior_Arms" checked={this.state.listing.classes.warrior_Arms} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Fury</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior_Fury" id="warrior_Fury" checked={this.state.listing.classes.warrior_Fury} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Protection</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior_Protection" id="warrior_Protection" checked={this.state.listing.classes.warrior_Protection} onChange={this.handleClassChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br /><br />
            <h3>Contact Details</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "175px", display: "inline-block"}}>Battle.net Contacts:
              (comma separated)</Label>
              <Input className="col flex-nowrap" name="contactbnet" type="text" value={this.state.listing.contactbnet} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "175px", display: "inline-block"}}>Discord Contacts:
              (comma separated)</Label>
              <Input className="col flex-nowrap" name="contactdiscord" type="text" value={this.state.listing.contactdiscord} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline className="row">
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Discord Link:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="discordlink" value={this.state.listing.discordlink} onChange={this.handleInputChange} />
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
  return {
    userListing: userListing.listing,
    userApp: userApp
  }
}

export default connect(mapStateToProps)(Listings)

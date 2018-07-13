import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap';

export default class Listings extends Component {
  constructor(props) {
    super(props);
    // Set default state for the form here
    // Once the user has an existing listing, use user data pulled from mongo (TBI)
    this.state = {
      guildName: "",
      region: "",
      server: "",
      faction: "",
      language: "",
      raidType: "",
      raidTimes: "",
      progress: "",
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

 };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {


    alert('Replace this alert with form handling plx');
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid text-light">
          <Form onSubmit={this.handleSubmit}>
            <h3>Guild Details</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Guild Name:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="guildName" value={this.state.guildName} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Region:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="region" value={this.state.region}>
                <option value="NA">NA</option>
                <option value="EU">EU</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Server:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="server" value={this.state.server}>
                <option value="Doomhammer">Doomhammer</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Faction:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="select" name="faction" value={this.state.faction}>
                <option value="Horde">Horde</option>
                <option value="Alliance">Alliance</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Language:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="language" value={this.state.language} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Raid Type:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="raidType" value={this.state.raidType} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Raid Times:</Label>

            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Progress:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="progress" value={this.state.progress} onChange={this.handleInputChange} />
            </FormGroup>
            <br /><br />
            <h3>Recruiting Classes</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Death Knight:</Label>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Blood</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight" id="blood" value={this.state.deathKnight.blood} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Unholy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight" value={this.state.deathKnight.unholy} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Frost</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="deathknight" value={this.state.deathKnight.frost} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="demonhunter" value={this.state.demonHunter.havoc} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Vengeance</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="demonhunter" value={this.state.demonHunter.vengeance} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="druid" value={this.state.druid.balance} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Feral</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.druid.feral} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Guardian</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.druid.guardian} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Restoration</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="druid" value={this.state.druid.restoration} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="hunter" value={this.state.hunter.beastMastery} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Marksmanship</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter" value={this.state.hunter.marksmanship} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Survival</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="hunter" value={this.state.hunter.survival} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="mage" value={this.state.mage.arcane} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Fire</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage" value={this.state.mage.fire} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Frost</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="mage" value={this.state.mage.frost} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="monk" value={this.state.monk.brewmaster} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Mistweaver</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk" value={this.state.monk.mistweaver} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Windwalker</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="monk" value={this.state.monk.windwalker} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="paladin" value={this.state.paladin.holy} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Protection</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin" value={this.state.paladin.protection} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Retribution</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="paladin" value={this.state.paladin.retribution} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="priest" value={this.state.priest.discipline} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Holy</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest" value={this.state.priest.holy} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Shadow</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="priest" value={this.state.priest.shadow} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="rogue" value={this.state.rogue.assassination} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Outlaw</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue" value={this.state.rogue.outlaw} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Subtlety</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="rogue" value={this.state.rogue.subtlety} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="shaman" value={this.state.shaman.elemental} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Enhancement</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman" value={this.state.shaman.enhancement} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Restoration</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="shaman" value={this.state.shaman.restoration} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="warlock" value={this.state.warlock.affliction} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Demonology</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock" value={this.state.warlock.demonology} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Destruction</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warlock" value={this.state.warlock.destruction} onChange={this.handleInputChange} />
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
                    <Input addon type="checkbox" name="warrior" value={this.state.warrior.arms} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Fury</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior" value={this.state.warrior.fury} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="col flex-nowrap">
                <InputGroupText style={{width: "130px"}}>Protection</InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" name="warrior" value={this.state.warrior.protection} onChange={this.handleInputChange} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <br /><br />
            <h3>Contact Details</h3>
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "175px", display: "inline-block"}}>Battle.net Contacts:
              (comma separated)</Label>
              <Input className="col flex-nowrap" name="bnetContacts" type="text" value={this.state.bnetContacts} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline row>
              <Label className="col flex-nowrap" style={{width: "175px", display: "inline-block"}}>Discord Contacts:
              (comma separated)</Label>
              <Input className="col flex-nowrap" name="discordContacts" type="text" value={this.state.discordContacts} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline className="row">
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Discord Link:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="discordLink" value={this.state.discordLink} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check inline className="row">
              <Label className="col flex-nowrap" style={{width: "150px", display: "inline-block"}}>Website:</Label>
              <Input className="col flex-nowrap" style={{width: "250px"}} type="text" name="website" value={this.state.website} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <FormGroup check>
              <Label className="row flex-nowrap" style={{width: "150px", display: "inline-block"}}>Description:</Label>
              <Input className="row flex-nowrap" style={{width: "500px"}} type="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} />
            </FormGroup>
            <br />
            <input type="submit" value="Submit" />
          </Form>
      </div>
    );
  }
}

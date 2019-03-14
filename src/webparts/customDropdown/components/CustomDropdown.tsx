import * as React from 'react';
import styles from './CustomDropdown.module.scss';
import { ICustomDropdownProps } from './ICustomDropdownProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const optionsCategory = [
  'Cars', 'Food', 'Soccer team'
]
const optionsSoccerTeams = [
  'AC Milan', 'Arsenal', 'Barcelona'
]

export default class CustomDropdown extends React.Component<ICustomDropdownProps, {}> {

  state = {
    selectedCategory: '',
    selectedSoccerTeam: '',
    showSoccerTeamDropdown: false,
    url: ''
  }

  categoryChanged(newCategory) {
    this.setState({
      selectedCategory: newCategory.value
    })
    switch (newCategory.value){
      case 'Soccer team':
        this.setState({
          showSoccerTeamDropdown: true
        })
        break
      default: 
        this.setState({
          showSoccerTeamDropdown: false,
          url: ''
        })
        break
    }
  }

  soccerTeamChanged(newSoccerTeam) {
    this,this.setState({
      selectedSoccerTeam: newSoccerTeam.value,
      url: 'https://www.' + newSoccerTeam.value.replace(/\s/g, "") + '.com'
    })
  }

  public render(): React.ReactElement<ICustomDropdownProps> {
    return (
      <div className={ styles.customDropdown }>
        <Dropdown className='categoryDropdown' options={optionsCategory} value={this.state.selectedCategory} onChange={(e) => this.categoryChanged(e)} placeholder='Select category' />
        { this.state.showSoccerTeamDropdown ? <Dropdown className='soccerTeamDropdown' options={optionsSoccerTeams} value={this.state.selectedSoccerTeam} onChange={(e) => this.soccerTeamChanged(e)} placeholder='Select soccer team' /> : null }
        { this.state.url != '' ? <a href={this.state.url}><div className={styles.selectedLink}>OK</div></a> : null }
      </div>
    );
  }
}
